import Header from "../components/Header/Header";
import Container from "../components/Container/Container";

const Page = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        <Container>
          { children }
        </Container>
      </div>
    </>
  )
};

export default Page;