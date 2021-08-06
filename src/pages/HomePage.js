import { useState, useEffect } from "react";

import topMovies from "../lib/topMovies";
import splitDataByNumberOfItemsPerPage from "../lib/splitDataByNumberOfItemsPerPage";
import OMDbApi from "../lib/OMDbApi";
import MOVIES from "../constants/MOVIES";

import Page from "./Page/Page";
import MoviesCardsList from "../components/MoviesCardsList/MoviesCardsList";
import Modal from "../components/Modal/Modal";
import MovieFull from "../components/MovieFull/MovieFull";
import Pagination from "../components/Pagination/Pagination";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [totalPagesWithMovies, setTotalPagesWithMovies] = useState(null);

  const handlePageChange = (pageNumber) => {
    setMovies(null);
    const omdbApi = new OMDbApi();
    const [getMoviesFromPage] = splitDataByNumberOfItemsPerPage(topMovies, MOVIES.PER_PAGE);

    omdbApi.fetchMoviesByIds(getMoviesFromPage(pageNumber)).then(movies => {
      setMovies(movies);
    })
  };

  useEffect(() => {
    const omdbApi = new OMDbApi();
    const [getMoviesFromPage, totalPagesWithMovies] = splitDataByNumberOfItemsPerPage(topMovies, MOVIES.PER_PAGE);

    setTotalPagesWithMovies(totalPagesWithMovies);

    omdbApi.fetchMoviesByIds(getMoviesFromPage(1)).then(movies => {
      setMovies(movies);
    })
  }, []);

  return (
    <Page title="Top 250 movies">
      { totalPagesWithMovies && <Pagination totalPages={ totalPagesWithMovies } onPageChange={ handlePageChange } /> }

      { movies && (
        <MoviesCardsList movies={ movies } onViewMovieFull={ setSelectedMovie } />
      ) }



      { selectedMovie && (
        <Modal onCLose={ () => setSelectedMovie(null) }>
          <MovieFull movie={ selectedMovie } />
        </Modal>
      ) }

      { !movies && <Loader /> }
    </Page>
  )
};

export default HomePage;