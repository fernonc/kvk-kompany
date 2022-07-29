import Navbar from "./components/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/Footer";
import Search from "./components/Search";

function App() {
  return (
    <>
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <Container>
        <main className="main">
          <Row className="justify-content-md-center">
            <Col lg="10">
              <Search />
            </Col>
          </Row>
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
