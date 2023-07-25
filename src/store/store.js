import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { storeSlice } from "./StoreStyle/storeSlice";
import { checkoutSlice } from "./checkout/checkoutSlice";
import thunkMiddleware  from 'redux-thunk';

const middleware = [ thunkMiddleware ];

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        store: storeSlice.reducer,
        checkout: checkoutSlice.reducer
    },
    middleware,
})