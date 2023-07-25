import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    isSaving: false,
    checkoutArticles: [],
    articlesCount: 0,
    tax: 1,
    total: 0,
    selected: null,
    messageSelected: ""
  },
  reducers: {
    setCheckoutArticles: (state, action) => {
      state.checkoutArticles = action.payload;
      state.articlesCount = state.checkoutArticles.length;
    },
    addCheckoutArticle: (state, action) => {
      state.checkoutArticles.push(action.payload);
      state.articlesCount = state.checkoutArticles.length;
      state.isSaving = false;
      state.messageSelected = "";
    },
    updateCheckoutArticle: (state, action) => {
        state.isSaving = false;
        state.checkoutArticles = state.checkoutArticles.map((article) => {
          if (article.id === action.payload.id) {
            return action.payload;
          }
  
          return article;
        });
        state.messageSaved = `${action.payload.title}, successfuly updated`;
      },
    deleteCheckoutArticle: (state, action) => {
      state.selected = null;
      state.checkoutArticles = state.checkoutArticles.filter(
        (article) => article.id !== action.payload
      );
      state.articlesCount = state.checkoutArticles.length;
    },
    setCheckoutSaving: (state, action) => {
      state.isSaving = true;
      state.messageSelected = "";
    },
    setSelectedCheckoutArticle: (state, action) => {
      state.selected = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  addCheckoutArticle,
  deleteCheckoutArticle,
  setCheckoutArticles,
  setCheckoutSaving,
  updateCheckoutArticle,
  setSelectedCheckoutArticle,
} = checkoutSlice.actions;
