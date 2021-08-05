import Container from "../../components/Container/Container";
import PageTitle from "../../components/PageTitle/PageTitle";

import styles from "./Page.module.css";

const Page = ({ title, children }) => {
  return (
    <div className={ styles.Page }>
      <Container>
        <PageTitle title={ title } />
        { children }
      </Container>
    </div>
  )
};

export default Page;