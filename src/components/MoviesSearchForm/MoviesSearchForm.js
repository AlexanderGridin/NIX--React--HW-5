import { useState } from "react";

const MoviesSearchForm = ({ onSubmit }) => {
  const [movieTitle, setMovieTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movieTitle);
  };

  return (
    <form action="#" onSubmit={ handleSubmit }>
      <div className="form-item">
        <label htmlFor="movie-title">Find movie</label>
        <input onChange={ (e) => setMovieTitle(e.target.value) } value={ movieTitle } type="search" name="movie-title" id="movie-title" />
      </div>
      <div className="form-actions">
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default MoviesSearchForm;