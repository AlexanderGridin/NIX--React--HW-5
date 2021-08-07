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
import MoviesCardsList from "../../components/MoviesCardsList/MoviesCardsList";
import Pagination from "../../components/Pagination/Pagination";
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

  const [activePaginationPage, setActivePaginationPage] = useState(
    PAGINATION.INITIAL_PAGE
  );

  const handlePageChange = (activePaginationPage) => {
    setActivePaginationPage(activePaginationPage);
  };

  const viewMovieInfo = (movie) => {
    dispatch(setMovieForInfoView({ movie }));
    dispatch(setModalIsActive({ isActive: MODAL.IS_ACTIVE }));
  };

  const handleMovieRemoving = (movie) => {
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
    let moviesFromActivePaginationPage =
      getMoviesFromPage(activePaginationPage);

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

      setActivePaginationPage(activePaginationPage - 1);
      moviesFromActivePaginationPage = getMoviesFromPage(
        activePaginationPage - 1
      );

      return;
    }

    if (moviesFromActivePaginationPage) {
      dispatch(setTotalPagesForPagination({ totalPagesForPagination }));

      omdbApi
        .fetchMoviesByIds(moviesFromActivePaginationPage)
        .then((movies) => {
          dispatch(setLoadedMovies({ loadedMovies: movies }));
        });
    }
  }, [topMovies, activePaginationPage]);

  return (
    <Page title="Top 250 movies">
      {totalPagesForPagination && loadedMovies !== MOVIES.NO_MOVIES && (
        <Pagination
          totalPages={totalPagesForPagination}
          pageForActivation={activePaginationPage}
          onPageChange={handlePageChange}
        />
      )}

      {loadedMovies === MOVIES.NO_MOVIES && (
        <div style={{ textAlign: "center", color: "#FFF" }}>
          No movies to show...
        </div>
      )}

      {loadedMovies && loadedMovies !== MOVIES.NO_MOVIES && (
        <MoviesCardsList
          movies={loadedMovies}
          onViewMovieInfo={viewMovieInfo}
          onMovieRemove={handleMovieRemoving}
        />
      )}

      {isModalActive && (
        <Modal onCLose={handleModalClose}>
          <MovieFull movie={movieForInfoView} />
        </Modal>
      )}

      {!loadedMovies && loadedMovies !== MOVIES.NO_MOVIES && <Loader />}
    </Page>
  );
};

export default HomePage;
