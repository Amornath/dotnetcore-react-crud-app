import { Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Contact from "./pages/Contact";

const App = () => {
  const token = localStorage.getItem("access_Token");

  return (
    <div>
      {token === null ||
      token === undefined ||
      token === "" ||
      token === "Error" ? (
        <Navigate to="/login" />
      ) : (
        <div>
          <Container fluid>
            <Row>
              <Col sm className="mt-2 min-vh-100">
                <Routes>
                  <Route path="/" element={<Contact />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default App;
