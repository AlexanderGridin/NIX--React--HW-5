import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setLoadedMovies,
  setMovieForInfoView,
  setTotalPagesForPagination,
  removeMovieFromLoadedMovies,
} from "../../store/moviesSlice";
import { setModalIsActive } from "../../store/modalSlice";

import OMDbApi from "../../lib/OMDbApi";
import splitDataByNumberOfItemsPerPage from "../../lib/splitDataByNumberOfItemsPerPage";
import { MOVIES, MODAL, PAGINATION } from "../../lib/constants";

import Page from "../Page/Page";
import MoviesCardsList from "../../components/MoviesCardsList/MoviesCardsList";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import MovieFull from "../../components/MovieFull/MovieFull";
import Loader from "../../components/Loader/Loader";

const SearchResultsPage = () => {
  const dispatch = useDispatch();

  const loadedMovies = useSelector((state) => state.movies.loadedMovies);
  const movieForInfoView = useSelector(
    (state) => state.movies.movieForInfoView
  );
  const totalPagesForPagination = useSelector(
    (state) => state.movies.totalPagesForPagination
  );
  const isModalActive = useSelector((state) => state.modal.isActive);

  const [activePaginationPage, setActivePaginationPage] = useState(
    PAGINATION.INITIAL_PAGE
  );
  const [moviesOnCurrentPage, setMoviesOnCurrentPage] = useState(null);

  const handlePageChange = (activePaginationPage) => {
    setActivePaginationPage(activePaginationPage);
  };

  const viewMovieInfo = (movie) => {
    const omdbApi = new OMDbApi();

    omdbApi.fetchMovieById(movie.imdbID).then((movie) => {
      dispatch(setMovieForInfoView({ movie }));
      dispatch(setModalIsActive({ isActive: MODAL.IS_ACTIVE }));
    });
  };

  const removeMovie = (movie) => {
    dispatch(removeMovieFromLoadedMovies({ movieId: movie.imdbID }));
  };

  const handleModalClose = () => {
    dispatch(setMovieForInfoView({ movie: MOVIES.NO_SELECTED }));
  };

  useEffect(() => {
    if (!loadedMovies) {
      return;
    }

    if (loadedMovies.length === 0) {
      setMoviesOnCurrentPage(MOVIES.NO_MOVIES);
      dispatch(setLoadedMovies({ loadedMovies: MOVIES.NO_MOVIES }));

      return;
    }

    const [getMoviesFromPage, totalPagesForPagination] =
      splitDataByNumberOfItemsPerPage(loadedMovies, MOVIES.PER_PAGE);
    const moviesFromActivePaginationPage =
      getMoviesFromPage(activePaginationPage);

    if (loadedMovies.length > 0 && moviesFromActivePaginationPage) {
      dispatch(setTotalPagesForPagination({ totalPagesForPagination }));
      setMoviesOnCurrentPage(getMoviesFromPage(activePaginationPage));

      return;
    }

    if (loadedMovies.length > 0 && !moviesFromActivePaginationPage) {
      setActivePaginationPage(activePaginationPage - 1);
    }
  }, [loadedMovies, activePaginationPage]);

  return (
    <Page title="Search results">
      {totalPagesForPagination && moviesOnCurrentPage !== MOVIES.NO_MOVIES && (
        <Pagination
          totalPages={totalPagesForPagination}
          pageForActivation={activePaginationPage}
          onPageChange={handlePageChange}
        />
      )}

      {moviesOnCurrentPage === MOVIES.NO_MOVIES && (
        <div style={{ textAlign: "center", color: "#FFF" }}>
          No movies to show...
        </div>
      )}

      {moviesOnCurrentPage && moviesOnCurrentPage !== MOVIES.NO_MOVIES && (
        <MoviesCardsList
          movies={moviesOnCurrentPage}
          onViewMovieInfo={viewMovieInfo}
          onMovieRemove={removeMovie}
        />
      )}

      {isModalActive && (
        <Modal onClose={handleModalClose}>
          <MovieFull movie={movieForInfoView} />
        </Modal>
      )}

      {!moviesOnCurrentPage && moviesOnCurrentPage !== MOVIES.NO_MOVIES && (
        <Loader />
      )}
    </Page>
  );
};

export default SearchResultsPage;
