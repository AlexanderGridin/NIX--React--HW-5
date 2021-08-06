import { createSlice } from "@reduxjs/toolkit";
import { MOVIES } from "../lib/constants";
import topMovies from "../lib/topMovies";

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    topMovies,
    movies: MOVIES.NOT_LOADED,
    selectedMovie: MOVIES.NO_SELECTED,
    totalPagesWithMovies: MOVIES.NO_PAGES,
    currentPage: 1
  },
  reducers: {
    setMovies (state, action) {
      state.movies = action.payload.movies;
    },

    setSelectedMovie (state, action) {
      state.selectedMovie = action.payload.movie;
    },

    setTotalPagesWithMovies (state, action) {
      state.totalPagesWithMovies = action.payload.totalPagesWithMovies;
    },

    removeMovieFromTopMovies (state, action) {
      state.topMovies = state.topMovies.filter((movieId) => movieId !== action.payload.movieId);
    },

    setCurrentPage (state, action) {
      state.currentPage = action.payload.pageNumber;
    }
  }
});

export const { setMovies, setSelectedMovie, setTotalPagesWithMovies, removeMovieFromTopMovies, setCurrentPage } = moviesSlice.actions;
export default moviesSlice.reducer;