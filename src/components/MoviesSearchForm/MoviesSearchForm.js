import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setLoadedMovies } from "../../store/moviesSlice";
import { MOVIES } from "../../lib/constants";

import OMDbApi from "../../lib/OMDbApi";

import styles from "./MoviesSearchForm.module.css";

const MoviesSearchForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [moviesTitleForSearch, setMoviesTitleForSearch] = useState("");

  const changeMoviesTitleForSearch = (e) => {
    setMoviesTitleForSearch(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (moviesTitleForSearch !== "") {
      dispatch(setLoadedMovies({ loadedMovies: MOVIES.NOT_LOADED }));

      const omdbApi = new OMDbApi();

      omdbApi.fetchMoviesByTitle(moviesTitleForSearch).then((searchResults) => {
        let findedMovies = [];

        searchResults.forEach((result) => {
          findedMovies.push(...result.Search);
        });

        dispatch(setLoadedMovies({ loadedMovies: findedMovies }));
      });

      history.push("/search-results");
    }
  };

  return (
    <form
      className={styles.MoviesSearchForm}
      action="#"
      onSubmit={handleSubmit}
    >
      <input
        className={styles.MoviesSearchFormSearchInput}
        onChange={changeMoviesTitleForSearch}
        value={moviesTitleForSearch}
        type="search"
        name="movie-title"
        placeholder="search"
        id="movie-title"
      />

      <button className={styles.MoviesSearchFormSubmit} type="submit">
        Search
      </button>
    </form>
  );
};

export default MoviesSearchForm;
