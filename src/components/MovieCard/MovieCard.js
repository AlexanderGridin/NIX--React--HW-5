import ResponsiveImage from "../ResponsiveImage/ResponsiveImage";
import Button from "../Button/Button";

import styles from "./MovieCard.module.css";

const MovieCard = ({ movie, onVeiwFull }) => {
  return (
    <div className={ styles.MovieCard }>
      <div className={ styles.MovieCardMedia }>
        <ResponsiveImage src={ movie.Poster } alt={ movie.Title } width="250" height="376" />
      </div>
      <div className={ styles.MovieCardBody }>
        <h3>{ movie.Title }</h3>
        <div>{ movie.Year }</div>
      </div>
      <div className={ styles.MovieCardFooter }>
        <Button text="Info" type="button" onClick={ () => onVeiwFull(movie) } />
        <Button text="Remove" type="button" visualStyle="danger" />
      </div>
    </div>
  )
};

export default MovieCard;