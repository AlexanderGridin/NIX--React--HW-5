import { createSlice } from "@reduxjs/toolkit";
import { MOVIES } from "../lib/constants";

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: MOVIES.NOT_LOADED,
    selectedMovie: MOVIES.NO_SELECTED,
    totalPagesWithMovies: MOVIES.NO_PAGES
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
    }
  }
});

export const { setMovies, setSelectedMovie, setTotalPagesWithMovies } = moviesSlice.actions;
export default moviesSlice.reducer;