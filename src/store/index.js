import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "./moviesSlice";
import modalReducer from "./modalSlice";

export default configureStore({
  reducer: {
    movies: moviesReducer,
    modal: modalReducer,
  }
});