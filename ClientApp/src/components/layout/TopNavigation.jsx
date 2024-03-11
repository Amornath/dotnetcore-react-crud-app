import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TopNavigation = () => {
  let navigate = useNavigate();
  const username = localStorage.getItem("user");

  const logOut = () => {
    localStorage.removeItem("access_Token");
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="border-bottom">
      <Container fluid>
        <Navbar.Brand href="#home">Contacts</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
          </Nav>
          <Nav className="me-2">
            <NavDropdown title={username} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item className="text-center" onClick={logOut}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavigation;
