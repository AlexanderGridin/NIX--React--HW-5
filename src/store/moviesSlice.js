import { createSlice } from "@reduxjs/toolkit";
import { MOVIES } from "../lib/constants";
import topMovies from "../lib/topMovies";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    topMovies,
    loadedMovies: MOVIES.NOT_LOADED,
    movieForInfoView: MOVIES.NO_SELECTED,
    totalPagesForPagination: MOVIES.NO_PAGES,
  },
  reducers: {
    setLoadedMovies(state, action) {
      state.loadedMovies = action.payload.loadedMovies;
    },

    setMovieForInfoView(state, action) {
      state.movieForInfoView = action.payload.movie;
    },

    setTotalPagesForPagination(state, action) {
      state.totalPagesForPagination = action.payload.totalPagesForPagination;
    },

    removeMovieFromTopMovies(state, action) {
      state.topMovies = state.topMovies.filter(
        (movieId) => movieId !== action.payload.movieId
      );
    },
  },
});

export const {
  setLoadedMovies,
  setMovieForInfoView,
  setTotalPagesForPagination,
  removeMovieFromTopMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
