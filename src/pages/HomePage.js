import { useState, useEffect } from "react";

import topMovies from "../lib/topMovies";
import splitDataByNumberOfItemsPerPage from "../lib/splitDataByNumberOfItemsPerPage";
import OMDbApi from "../lib/OMDbApi";
import MOVIES from "../constants/MOVIES";

import Page from "./Page/Page";
import MoviesCardsList from "../components/MoviesCardsList/MoviesCardsList";
import Modal from "../components/Modal/Modal";
import MovieFull from "../components/MovieFull/MovieFull";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const [getMoviesFromPage, totalPagesWithMovies] = splitDataByNumberOfItemsPerPage(topMovies, MOVIES.PER_PAGE);
    const omdbApi = new OMDbApi();

    omdbApi.fetchMoviesByIds(getMoviesFromPage(1)).then(movies => {
      setMovies(movies);
      console.log(movies, totalPagesWithMovies)
    })
  }, []);


  return (
    <Page title="Top 250 movies">
      <MoviesCardsList movies={ movies } onViewMovieFull={ setSelectedMovie } />
      { selectedMovie && (
        <Modal onCLose={ () => setSelectedMovie(null) }>
          <MovieFull movie={ selectedMovie } />
        </Modal>
      ) }
    </Page>
  )
};

export default HomePage;