import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import articleSlice from './articlesSlice';

const rootReducer = combineReducers({
    user: userSlice,
    articles: articleSlice
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;


const store = configureStore({
    reducer: rootReducer
})

export default store