import Header from "../components/Header/Header";
import Container from "../components/Container/Container";
import PageTitle from "../components/PageTitle/PageTitle";

const Page = ({ title, children }) => {
  return (
    <>
      <Header />
      <div>
        <Container>
          <PageTitle title={ title } />
          { children }
        </Container>
      </div>
    </>
  )
};

export default Page;