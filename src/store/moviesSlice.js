import { createSlice } from "@reduxjs/toolkit";
import { MOVIES, PAGINATION } from "../lib/constants";
import topMovies from "../lib/topMovies";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    topMovies,
    loadedMovies: MOVIES.NOT_LOADED,
    movieForInfoView: MOVIES.NO_SELECTED,
    totalPagesForPagination: MOVIES.NO_PAGES,
    currentPaginationPage: PAGINATION.INITIAL_PAGE,
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

    setCurrentPaginationPage(state, action) {
      state.currentPaginationPage = action.payload.currentPaginationPage;
    },
  },
});

export const {
  setLoadedMovies,
  setMovieForInfoView,
  setTotalPagesForPagination,
  removeMovieFromTopMovies,
  setCurrentPaginationPage,
} = moviesSlice.actions;
export default moviesSlice.reducer;
