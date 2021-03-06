import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setLoadedMovies,
  setMovieForInfoView,
  setTotalPagesForPagination,
  removeMovieFromTopMovies,
} from "../../store/moviesSlice";
import { setModalIsActive } from "../../store/modalSlice";

import splitDataByNumberOfItemsPerPage from "../../lib/splitDataByNumberOfItemsPerPage";
import OMDbApi from "../../lib/OMDbApi";
import { MOVIES, MODAL, PAGINATION } from "../../lib/constants";

import Page from "../Page/Page";
import Pagination from "../../components/Pagination/Pagination";
import MoviesCardsList from "../../components/MoviesCardsList/MoviesCardsList";
import Modal from "../../components/Modal/Modal";
import MovieFull from "../../components/MovieFull/MovieFull";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const dispatch = useDispatch();

  const topMovies = useSelector((state) => state.movies.topMovies);
  const loadedMovies = useSelector((state) => state.movies.loadedMovies);
  const movieForInfoView = useSelector(
    (state) => state.movies.movieForInfoView
  );
  const totalPagesForPagination = useSelector(
    (state) => state.movies.totalPagesForPagination
  );
  const isModalActive = useSelector((state) => state.modal.isActive);

  const [activePaginationPageNumber, setActivePaginationPageNumber] = useState(
    PAGINATION.INITIAL_PAGE
  );

  const handlePageChange = (activePaginationPageNumber) => {
    setActivePaginationPageNumber(activePaginationPageNumber);
  };

  const viewMovieInfo = (movie) => {
    dispatch(setMovieForInfoView({ movie }));
    dispatch(setModalIsActive({ isActive: MODAL.IS_ACTIVE }));
  };

  const removeMovie = (movie) => {
    dispatch(removeMovieFromTopMovies({ movieId: movie.imdbID }));
  };

  const handleModalClose = () => {
    dispatch(setMovieForInfoView({ movie: MOVIES.NO_SELECTED }));
  };

  useEffect(() => {
    dispatch(setLoadedMovies({ loadedMovies: MOVIES.NOT_LOADED }));

    const omdbApi = new OMDbApi();
    const [getMoviesFromPage, totalPagesForPagination] =
      splitDataByNumberOfItemsPerPage(topMovies, MOVIES.PER_PAGE);
    let moviesFromActivePaginationPage = getMoviesFromPage(
      activePaginationPageNumber
    );

    if (!moviesFromActivePaginationPage && totalPagesForPagination === 0) {
      dispatch(setLoadedMovies({ loadedMovies: MOVIES.NO_MOVIES }));
      return;
    }

    if (!moviesFromActivePaginationPage) {
      dispatch(
        setTotalPagesForPagination({
          totalPagesForPagination: totalPagesForPagination - 1,
        })
      );

      setActivePaginationPageNumber(activePaginationPageNumber - 1);
      moviesFromActivePaginationPage = getMoviesFromPage(
        activePaginationPageNumber - 1
      );

      return;
    }

    dispatch(setTotalPagesForPagination({ totalPagesForPagination }));

    omdbApi.fetchMoviesByIds(moviesFromActivePaginationPage).then((movies) => {
      dispatch(setLoadedMovies({ loadedMovies: movies }));
    });
  }, [topMovies, activePaginationPageNumber]);

  return (
    <Page title="Top 250 movies">
      {totalPagesForPagination &&
        loadedMovies !== MOVIES.NOT_LOADED &&
        loadedMovies !== MOVIES.NO_MOVIES && (
          <Pagination
            totalPages={totalPagesForPagination}
            pageNumberForActivation={activePaginationPageNumber}
            onPageChange={handlePageChange}
          />
        )}

      {loadedMovies === MOVIES.NO_MOVIES && (
        <div style={{ textAlign: "center", color: "#FFF" }}>
          No movies to show...
        </div>
      )}

      {loadedMovies !== MOVIES.NOT_LOADED &&
        loadedMovies !== MOVIES.NO_MOVIES && (
          <MoviesCardsList
            movies={loadedMovies}
            onViewMovieInfo={viewMovieInfo}
            onMovieRemove={removeMovie}
          />
        )}

      {isModalActive && (
        <Modal onClose={handleModalClose}>
          <MovieFull movie={movieForInfoView} />
        </Modal>
      )}

      {loadedMovies === MOVIES.NOT_LOADED &&
        loadedMovies !== MOVIES.NO_MOVIES && <Loader />}
    </Page>
  );
};

export default HomePage;
