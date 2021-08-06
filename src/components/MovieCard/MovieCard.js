import ResponsiveImage from "../ResponsiveImage/ResponsiveImage";
import Button from "../Button/Button";

import styles from "./MovieCard.module.css";

const MovieCard = ({ movie, onVeiwInfo, onRemove }) => {
  return (
    <div className={styles.MovieCard}>
      <div className={styles.MovieCardMedia}>
        <ResponsiveImage
          src={movie.Poster}
          alt={movie.Title}
          width="250"
          height="376"
        />
      </div>
      <div className={styles.MovieCardBody}>
        <h3 className={styles.MovieCardTitle}>{movie.Title}</h3>
        <div
          className={styles.MovieCardYear}
        >{`${movie.Year} / ${movie.Rated} / ${movie.Runtime}`}</div>
      </div>
      <div className={styles.MovieCardFooter}>
        <Button type="button" onClick={() => onVeiwInfo(movie)}>
          Info
        </Button>
        <Button
          type="button"
          visualStyle="danger"
          onClick={() => onRemove(movie)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
