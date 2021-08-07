import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import MoviesSearchForm from "../MoviesSearchForm/MoviesSearchForm";
import Navigation from "../Navigation/Navigation";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.Header}>
      <Container>
        <div className={styles.HeaderRow}>
          <div className={styles.HeaderColumn}>
            <Logo />
          </div>
          <div className={styles.HeaderColumn}>
            <MoviesSearchForm />
          </div>
        </div>
      </Container>

      <Navigation />
    </header>
  );
};

export default Header;
