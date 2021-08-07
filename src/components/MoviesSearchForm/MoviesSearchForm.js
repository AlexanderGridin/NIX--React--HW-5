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
  const [movieTitle, setMovieTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (movieTitle !== "") {
      console.log(movieTitle);
      dispatch(setLoadedMovies({ loadedMovies: MOVIES.NOT_LOADED }));

      const omdbApi = new OMDbApi();

      omdbApi.fetchMoviesByTitle(movieTitle).then((searchResult) => {
        console.log(searchResult);
        dispatch(setLoadedMovies({ loadedMovies: searchResult.Search }));
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
        onChange={(e) => setMovieTitle(e.target.value.trim())}
        value={movieTitle}
        type="search"
        name="movie-title"
        placeholder="search"
        id="movie-title"
      />
      {/* <Button text="Search" type="submit" /> */}
      <button className={styles.MoviesSearchFormSubmit} type="submit">
        Search
      </button>
    </form>
  );
};

export default MoviesSearchForm;
