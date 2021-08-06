import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies, setSelectedMovie, setTotalPagesWithMovies } from "../store/moviesSlice";
import { setModalIsActive } from "../store/modalSlice";

import topMovies from "../lib/topMovies";
import splitDataByNumberOfItemsPerPage from "../lib/splitDataByNumberOfItemsPerPage";
import OMDbApi from "../lib/OMDbApi";
import { MOVIES, MODAL } from "../lib/constants";

import Page from "./Page/Page";
import MoviesCardsList from "../components/MoviesCardsList/MoviesCardsList";
import Modal from "../components/Modal/Modal";
import MovieFull from "../components/MovieFull/MovieFull";
import Pagination from "../components/Pagination/Pagination";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const dispatch = useDispatch();

  const movies = useSelector(state => state.movies.movies);
  const selectedMovie = useSelector(state => state.movies.selectedMovie);
  const totalPagesWithMovies = useSelector(state => state.movies.totalPagesWithMovies);

  const isModalActive = useSelector(state => state.modal.isActive);

  const handlePageChange = (pageNumber) => {
    dispatch(setMovies({ movies: MOVIES.NOT_LOADED }));

    const omdbApi = new OMDbApi();
    const [getMoviesFromPage] = splitDataByNumberOfItemsPerPage(topMovies, MOVIES.PER_PAGE);

    omdbApi.fetchMoviesByIds(getMoviesFromPage(pageNumber)).then(movies => {
      dispatch(setMovies({ movies }));
    })
  };

  const handleSelectedMovie = (movie) => {
    dispatch(setSelectedMovie({ movie }));
    dispatch(setModalIsActive({ isActive: MODAL.IS_ACTIVE }));
  };

  const handleModalClose = () => {
    dispatch(setSelectedMovie({ movie: MOVIES.NO_SELECTED }));
  };

  useEffect(() => {
    const omdbApi = new OMDbApi();
    const [getMoviesFromPage, totalPagesWithMovies] = splitDataByNumberOfItemsPerPage(topMovies, MOVIES.PER_PAGE);

    dispatch(setTotalPagesWithMovies({ totalPagesWithMovies }));

    omdbApi.fetchMoviesByIds(getMoviesFromPage(1)).then(movies => {
      dispatch(setMovies({ movies }));
    })
  }, []);

  return (
    <Page title="Top 250 movies">
      { totalPagesWithMovies && <Pagination totalPages={ totalPagesWithMovies } onPageChange={ handlePageChange } /> }

      { movies && (
        <MoviesCardsList movies={ movies } onViewMovieFull={ handleSelectedMovie } />
      ) }



      { isModalActive && (
        <Modal onCLose={ handleModalClose }>
          <MovieFull movie={ selectedMovie } />
        </Modal>
      ) }

      { !movies && <Loader /> }
    </Page>
  )
};

export default HomePage;