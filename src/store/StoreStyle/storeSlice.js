import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    isSaving: false,
    messageSaved: "",
    articles: [],
    active: null,
    filterCategory: "women",
    filteredArticles: [],
    selected: null,
  },
  reducers: {
    savingNewArticle: (state) => {
      state.isSaving = true;
    },
    addNewEmptyArticle: (state, action) => {
      state.articles.push(action.payload);
      state.isSaving = false;
    },
    setActiveArticle: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateArticle: (state, action) => {
      state.isSaving = false;
      state.articles = state.articles.map((article) => {
        if (article.id === action.payload.id) {
          return action.payload;
        }

        return article;
      });
      state.messageSaved = `${action.payload.title}, successfuly updated`;
    },
    setPhotosToActiveArticle: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    clearArticlesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.active = null;
    },
    deleteArticleById: (state, action) => {
      state.active = null;
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setFilteredArticles: (state, action) => {
      state.filteredArticles = state.articles.filter(
        (article) => article.category === action.payload
      );
    },
    setSelectedArticle: (state, action) => {
      state.selected = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  savingNewArticle,
  addNewEmptyArticle,
  setActiveArticle,
  setArticles,
  setSaving,
  updateArticle,
  setPhotosToActiveArticle,
  clearArticlesLogout,
  deleteArticleById,
  setFilterCategory,
  setFilteredArticles,
  setSelectedArticle,
} = storeSlice.actions;
