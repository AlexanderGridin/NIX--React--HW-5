import MovieCard from "../MovieCard/MovieCard";

import styles from "./MoviesCardsList.module.css";

const MoviesCardsList = ({ movies, onViewMovieInfo, onMovieRemove }) => {


  return (
    <>
      { movies && (
        <ul className={ styles.MoviesCardsList }>
          { movies.map((movie) => {
            return (
              <li className={ styles.MoviesCardsListItem } key={ movie.imdbID }>
                <MovieCard movie={ movie } onVeiwInfo={ onViewMovieInfo } onRemove={ onMovieRemove } />
              </li>
            );
          }) }
        </ul>
      ) }
    </>
  )
};

export default MoviesCardsList;