import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyArticle,
  deleteArticleById,
  savingNewArticle,
  setActiveArticle,
  setArticles,
  setFilteredArticles,
  setPhotosToActiveArticle,
  setSaving,
  updateArticle,
} from "./storeSlice";
import { loadArticles } from "../../helpers/loadArticles";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewArticle = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewArticle());

    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const newArticle = {
      title: "",
      price: "",
      description: "",
      quantity: 1,
      stock: 0,
      tax: 0,
      category: "",
      imageUrls: [],
    };
    const newDoc = doc(collection(FirebaseDB, `/articles`));
    await setDoc(newDoc, newArticle);

    newArticle.id = newDoc.id;
    dispatch(addNewEmptyArticle(newArticle));
    dispatch(setActiveArticle(newArticle));
  };
};

export const startLoadingArticles = () => {
  return async (dispatch, getState) => {
    const { filterCategory } = getState().store;


    const articles = await loadArticles();

    dispatch(setArticles(articles));
    dispatch( setFilteredArticles(filterCategory));
  };
};

export const startSaveArticle = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: article } = getState().store;

    const articleFireStore = { ...article };
    delete articleFireStore.id;

    const docRef = doc(FirebaseDB, `/articles/${article.id}`);
    await setDoc(docRef, articleFireStore, { merge: true });

    dispatch(updateArticle(article));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveArticle(photosUrls));
  };
};

export const startDeletingArticle = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: article } = getState().store;

    const docRef = doc(FirebaseDB, `/articles/${article.id}`);
    await deleteDoc(docRef);

    dispatch(deleteArticleById(article.id));
  };
};

export const startUpdateArticlesStock = (articles) => {
  return async (dispatch) => {
    let constants = [];

    articles.map( article => {
      constants.push(handleUpdateArticlesStock(article, dispatch));
    });

    Promise.all(constants).then((values) => console.log(values, 'success')).catch((error) => console.error(error));
  };
};

export const handleUpdateArticlesStock = async (article, dispatch) => {
  const articleFireStore = { ...article };
  delete articleFireStore.id;

  const docRef = doc(FirebaseDB, `/articles/${article.id}`);
  await setDoc(docRef, articleFireStore, { merge: true });

  dispatch(updateArticle(article));
};
