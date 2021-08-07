import { createSlice } from "@reduxjs/toolkit";
import { MOVIES } from "../lib/constants";
import TOP_MOVIES from "../lib/TOP_MOVIES";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    topMovies: TOP_MOVIES,
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

    removeMovieFromLoadedMovies(state, action) {
      state.loadedMovies = state.loadedMovies.filter(
        (movie) => movie.imdbID !== action.payload.movieId
      );
    },
  },
});

export const {
  setLoadedMovies,
  setMovieForInfoView,
  setTotalPagesForPagination,
  removeMovieFromTopMovies,
  removeMovieFromLoadedMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
