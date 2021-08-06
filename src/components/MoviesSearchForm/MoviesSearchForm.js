import { useState } from "react";

import styles from "./MoviesSearchForm.module.css";

const MoviesSearchForm = ({ onSubmit }) => {
  const [movieTitle, setMovieTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    if (movieTitle !== '') {
      onSubmit(movieTitle);
    }
  };

  return (
    <form className={ styles.MoviesSearchForm } action="#" onSubmit={ handleSubmit }>
      <input className={ styles.MoviesSearchFormSearchInput } onChange={ (e) => setMovieTitle(e.target.value.trim()) } value={ movieTitle } type="search" name="movie-title" placeholder="search" id="movie-title" />
      {/* <Button text="Search" type="submit" /> */ }
      <button className={ styles.MoviesSearchFormSubmit } type="submit">Search</button>
    </form>
  );
};

export default MoviesSearchForm;