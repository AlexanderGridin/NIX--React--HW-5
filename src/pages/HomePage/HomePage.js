import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setLoadedMovies,
  setMovieForInfoView,
  setTotalPagesForPagination,
  removeMovieFromTopMovies,
  setCurrentPaginationPage,
} from "../../store/moviesSlice";
import { setModalIsActive } from "../../store/modalSlice";

import splitDataByNumberOfItemsPerPage from "../../lib/splitDataByNumberOfItemsPerPage";
import OMDbApi from "../../lib/OMDbApi";
import { MOVIES, MODAL } from "../../lib/constants";

import Page from "../Page/Page";
import MoviesCardsList from "../../components/MoviesCardsList/MoviesCardsList";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import MovieFull from "../../components/MovieFull/MovieFull";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const dispatch = useDispatch();

  const topMovies = useSelector((state) => state.movies.topMovies);
  const movies = useSelector((state) => state.movies.loadedMovies);
  const movieForInfoView = useSelector(
    (state) => state.movies.movieForInfoView
  );
  const totalPagesForPagination = useSelector(
    (state) => state.movies.totalPagesForPagination
  );
  const currentPaginationPage = useSelector(
    (state) => state.movies.currentPaginationPage
  );

  const isModalActive = useSelector((state) => state.modal.isActive);

  const handlePageChange = (currentPaginationPage) => {
    dispatch(setCurrentPaginationPage({ currentPaginationPage }));
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
    let moviesFromCurrentPage = getMoviesFromPage(currentPaginationPage);

    if (!moviesFromCurrentPage && totalPagesForPagination === 0) {
      dispatch(setLoadedMovies({ loadedMovies: MOVIES.NO_MOVIES }));
      return;
    }

    if (!moviesFromCurrentPage) {
      dispatch(
        setTotalPagesForPagination({
          totalPagesForPagination: totalPagesForPagination - 1,
        })
      );
      dispatch(
        setCurrentPaginationPage({
          currentPaginationPage: currentPaginationPage - 1,
        })
      );
      moviesFromCurrentPage = getMoviesFromPage(currentPaginationPage - 1);
    }

    if (moviesFromCurrentPage) {
      dispatch(setTotalPagesForPagination({ totalPagesForPagination }));

      omdbApi.fetchMoviesByIds(moviesFromCurrentPage).then((movies) => {
        dispatch(setLoadedMovies({ loadedMovies: movies }));
      });
    }
  }, [topMovies, currentPaginationPage]);

  return (
    <Page title="Top 250 movies">
      {totalPagesForPagination && movies !== MOVIES.NO_MOVIES && (
        <Pagination
          totalPages={totalPagesForPagination}
          activePageProp={currentPaginationPage}
          onPageChange={handlePageChange}
        />
      )}

      {movies === MOVIES.NO_MOVIES && (
        <div style={{ textAlign: "center", color: "#FFF" }}>
          No movies to show...
        </div>
      )}

      {movies && movies !== MOVIES.NO_MOVIES && (
        <MoviesCardsList
          movies={movies}
          onViewMovieInfo={viewMovieInfo}
          onMovieRemove={handleMovieRemoving}
        />
      )}

      {isModalActive && (
        <Modal onCLose={handleModalClose}>
          <MovieFull movie={movieForInfoView} />
        </Modal>
      )}

      {!movies && movies !== MOVIES.NO_MOVIES && <Loader />}
    </Page>
  );
};

export default HomePage;
