import { useState, useEffect } from "react";

import topMovies from "../lib/topMovies";
import splitDataByNumberOfItemsPerPage from "../lib/splitDataByNumberOfItemsPerPage";
import OMDbApi from "../lib/OMDbApi";
import MOVIES from "../constants/MOVIES";

import Page from "./Page";
import MoviesCardsList from "../components/MoviesCardsList/MoviesCardsList";

const HomePage = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const [getMoviesFromPage, totalPagesWithMovies] = splitDataByNumberOfItemsPerPage(topMovies, MOVIES.PER_PAGE);
    const omdbApi = new OMDbApi();

    omdbApi.fetchMoviesByIds(getMoviesFromPage(1)).then(movies => {
      setMovies(movies);
      console.log(movies, totalPagesWithMovies)
    })
  }, []);


  return (
    <Page>
      <MoviesCardsList movies={ movies } />
    </Page>
  )
};

export default HomePage;