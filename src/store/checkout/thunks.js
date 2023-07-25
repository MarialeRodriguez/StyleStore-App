import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { loadCheckoutArticles } from "../../helpers/loadCheckoutArticles";
import { addCheckoutArticle, deleteCheckoutArticle, setCheckoutArticles, setCheckoutSaving, setSelectedCheckoutArticle, updateCheckoutArticle } from "./checkoutSlice";
import { FirebaseDB } from "../../firebase/config";

export const startLoadingCheckoutArticles = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const articles = await loadCheckoutArticles(uid);

    dispatch(setCheckoutArticles(articles));
  };
};

export const startNewCheckoutArticle = (selectedArticle) => {
  return async (dispatch, getState) => {
    dispatch(setCheckoutSaving());
    
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const newDoc = doc(collection(FirebaseDB, `${uid}/cart-list/articles/`));
    await setDoc(newDoc, selectedArticle);

    selectedArticle.id = newDoc.id;
    dispatch(setSelectedCheckoutArticle(selectedArticle));
  };
};

export const startSaveCheckoutArticle = () => {
  return async (dispatch, getState) => {
    dispatch(setCheckoutSaving());

    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const { selected: article } = getState().checkout;
    const newCheckoutArticle = { ...article };
 
    const newDoc = doc(collection(FirebaseDB, `${uid}/cart-list/articles/`));
    await setDoc(newDoc, newCheckoutArticle);

    newCheckoutArticle.id = newDoc.id;

    dispatch(addCheckoutArticle(newCheckoutArticle));
  };
};

export const startDeletingCheckoutArticle = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const docRef = doc(FirebaseDB, `${uid}/cart-list/articles/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteCheckoutArticle(id));
  };
};

export const startDeletingCheckoutArticlesStock = (ids) => {
  return async (dispatch,getState )=> {
    const { uid } = getState().auth;
    let constants = [];

    ids.map( id => {
      constants.push(handleDeleteById(uid, id, dispatch));
    });

    Promise.allSettled(constants).then((values) => console.log(values)).catch((error) => console.error(error));
  }
} 


export const handleDeleteById = async (uid, id, dispatch) => {
  const docRef = doc(FirebaseDB, `${uid}/cart-list/articles/${id}`);
  await deleteDoc(docRef);
  dispatch(deleteCheckoutArticle(id))
};
