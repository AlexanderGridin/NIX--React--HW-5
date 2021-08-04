import Container from "../Container/Container";
import MoviesSearchForm from "../MoviesSearchForm/MoviesSearchForm";

const Header = () => {
  return (
    <header>
      <Container>
        <p>Site-header</p>
        <MoviesSearchForm onSubmit={ (title) => console.log(title) } />
      </Container>
    </header>
  )
};

export default Header;