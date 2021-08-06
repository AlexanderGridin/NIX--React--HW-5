import ResponsiveImage from "../ResponsiveImage/ResponsiveImage";

import styles from "./MovieFull.module.css";

const MovieFull = ({ movie }) => {
  return (
    <div className={styles.MovieFull}>
      <div className={styles.MovieFullMedia}>
        <ResponsiveImage
          src={movie.Poster}
          alt={movie.Title}
          width="300"
          height="427"
        />
      </div>
      <div className={styles.MovieFullContent}>
        <h2 className={styles.MovieFullTitle}>{movie.Title}</h2>

        <div className={styles.MovieFullField}>
          <div className={styles.MovieFullFieldLabel}>Genre</div>
          <div className={styles.MovieFullFieldValue}>{movie.Genre}</div>
        </div>
        <div className={styles.MovieFullField}>
          <div className={styles.MovieFullFieldLabel}>IMDb rating</div>
          <div className={styles.MovieFullFieldValue}>
            {movie.imdbRating} / 10
          </div>
        </div>
        <div className={styles.MovieFullField}>
          <div className={styles.MovieFullFieldLabel}>Language</div>
          <div className={styles.MovieFullFieldValue}>{movie.Language}</div>
        </div>
        <div className={styles.MovieFullField}>
          <div className={styles.MovieFullFieldLabel}>Director</div>
          <div className={styles.MovieFullFieldValue}>{movie.Director}</div>
        </div>
        <div className={styles.MovieFullField}>
          <div className={styles.MovieFullFieldLabel}>Writer</div>
          <div className={styles.MovieFullFieldValue}>{movie.Writer}</div>
        </div>
        <div className={styles.MovieFullField}>
          <div className={styles.MovieFullFieldLabel}>Actors</div>
          <div className={styles.MovieFullFieldValue}>{movie.Actors}</div>
        </div>
        <div className={styles.MovieFullField}>
          <div className={styles.MovieFullFieldLabel}>About</div>
          <div className={styles.MovieFullFieldValue}>{movie.Plot}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieFull;
