import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { useEffect } from "react";
import { startLoadingArticles } from "../store/StoreStyle/thunks";
import { setFilteredArticles } from "../store/StoreStyle/storeSlice";
import { startLoadingCheckoutArticles } from "../store/checkout/thunks";

export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
    
    onAuthStateChanged( FirebaseAuth, async( user ) => {
      dispatch( startLoadingArticles() );
      if( !user ) return dispatch( logout() );
      const { uid, email, displayName, photoURL } = user;
      dispatch( login({ uid, email, displayName, photoURL }) );
      dispatch(startLoadingCheckoutArticles());
    })
  
  }, []);

  return {
    status
  }
  
}

