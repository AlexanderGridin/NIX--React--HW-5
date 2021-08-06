import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setMovies, setSelectedMovie, setTotalPagesWithMovies, removeMovieFromTopMovies, setCurrentPage } from "../store/moviesSlice";
import { setModalIsActive } from "../store/modalSlice";

import splitDataByNumberOfItemsPerPage from "../lib/splitDataByNumberOfItemsPerPage";
import OMDbApi from "../lib/OMDbApi";
import { MOVIES, MODAL } from "../lib/constants";

import Page from "./Page/Page";
import MoviesCardsList from "../components/MoviesCardsList/MoviesCardsList";
import Pagination from "../components/Pagination/Pagination";
import Modal from "../components/Modal/Modal";
import MovieFull from "../components/MovieFull/MovieFull";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const dispatch = useDispatch();

  const topMovies = useSelector(state => state.movies.topMovies);
  const movies = useSelector(state => state.movies.movies);
  const selectedMovie = useSelector(state => state.movies.selectedMovie);
  const totalPagesWithMovies = useSelector(state => state.movies.totalPagesWithMovies);
  const currentPage = useSelector(state => state.movies.currentPage);

  const isModalActive = useSelector(state => state.modal.isActive);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage({ pageNumber }));
  };

  const viewMovieInfo = (movie) => {
    dispatch(setSelectedMovie({ movie }));
    dispatch(setModalIsActive({ isActive: MODAL.IS_ACTIVE }));
  };

  const handleMovieRemoving = (movie) => {
    dispatch(removeMovieFromTopMovies({ movieId: movie.imdbID }));
  }

  const handleModalClose = () => {
    dispatch(setSelectedMovie({ movie: MOVIES.NO_SELECTED }));
  };

  useEffect(() => {
    dispatch(setMovies({ movies: MOVIES.NOT_LOADED }));

    const omdbApi = new OMDbApi();
    const [getMoviesFromPage, totalPagesWithMovies] = splitDataByNumberOfItemsPerPage(topMovies, MOVIES.PER_PAGE);
    let moviesFromCurrentPage = getMoviesFromPage(currentPage);

    if (!moviesFromCurrentPage && totalPagesWithMovies === 0) {
      dispatch(setMovies({ movies: MOVIES.NO_MOVIES }))
      return;
    }

    if (!moviesFromCurrentPage) {
      dispatch(setTotalPagesWithMovies({ totalPagesWithMovies: totalPagesWithMovies - 1 }));
      dispatch(setCurrentPage({ pageNumber: currentPage - 1 }));
      moviesFromCurrentPage = getMoviesFromPage(currentPage - 1);
    }

    if (moviesFromCurrentPage) {
      dispatch(setTotalPagesWithMovies({ totalPagesWithMovies }));
    }

    omdbApi.fetchMoviesByIds(moviesFromCurrentPage).then(movies => {
      dispatch(setMovies({ movies }));
    })
  }, [topMovies, currentPage]);

  return (
    <Page title="Top 250 movies">
      { totalPagesWithMovies && movies !== MOVIES.NO_MOVIES && <Pagination totalPages={ totalPagesWithMovies } activePageProp={ currentPage } onPageChange={ handlePageChange } /> }

      { movies === MOVIES.NO_MOVIES && (<div style={ { textAlign: 'center', color: '#FFF' } }>No movies to show...</div>) }

      { movies && movies !== MOVIES.NO_MOVIES && (
        <MoviesCardsList movies={ movies } onViewMovieInfo={ viewMovieInfo } onMovieRemove={ handleMovieRemoving } />
      ) }

      { isModalActive && (
        <Modal onCLose={ handleModalClose }>
          <MovieFull movie={ selectedMovie } />
        </Modal>
      ) }

      { !movies && movies !== MOVIES.NO_MOVIES && <Loader /> }
    </Page>
  )
};

export default HomePage;