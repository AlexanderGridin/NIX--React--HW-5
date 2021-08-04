import MovieCard from "../MovieCard/MovieCard";

import styles from "./MoviesCardsList.module.css";

const MoviesCardsList = ({ movies }) => {
  return (
    movies &&
    <ul className={ styles.MoviesCardsList }>
      { movies.map((movie) => {
        return (
          <li className={ styles.MoviesCardsListItem } key={ movie.imdbID }>
            <MovieCard movie={ movie } />
          </li>
        );
      }) }
    </ul>
  )
};

export default MoviesCardsList;