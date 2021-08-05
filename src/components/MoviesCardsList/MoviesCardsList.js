import MovieCard from "../MovieCard/MovieCard";

import styles from "./MoviesCardsList.module.css";

const MoviesCardsList = ({ movies, onViewMovieFull }) => {


  return (
    <>
      { movies && (
        <ul className={ styles.MoviesCardsList }>
          { movies.map((movie) => {
            return (
              <li className={ styles.MoviesCardsListItem } key={ movie.imdbID }>
                <MovieCard movie={ movie } onVeiwFull={ onViewMovieFull } />
              </li>
            );
          }) }
        </ul>
      ) }
    </>
  )
};

export default MoviesCardsList;