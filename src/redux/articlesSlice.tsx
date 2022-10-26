import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type Article = {
  lead_paragraph: string;
  headline: {
    main: string;
  },
  byline: {
    original: string | null;
  },
  _id: string | null;
}

export type ArticleState = {
  articles: Article[];
  filteredArticles: Article[]

}

const initialState: ArticleState = {
  articles: [],
  filteredArticles: []
}

const articleSlice = createSlice({
  name: 'article', initialState, reducers: {
    setArticles(state, action: PayloadAction<Article[]>) {
      state.articles = {
        ...state.articles,
        ...action.payload,
      };
    },

    setFilteredArticles(state, action: PayloadAction<Article[]>) {
      state.filteredArticles = {
        ...state.filteredArticles,
        ...action.payload,
      };
    },
  }
})

export const { setArticles, setFilteredArticles } = articleSlice.actions;

export default articleSlice.reducer