import { useState } from "react";
import { Card, Col, Form, Row, Button, Spinner } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  let navigate = useNavigate();
  const [messages, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setLoading(true);

    fetch(import.meta.env.VITE_API_URL + "Auth/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((result) => {
            setLoading(false);
            if (result.access_token === "Error") {
              setMessage([{ error: "Invalid User Name or Password" }]);
              return;
            } else {
              localStorage.setItem("access_Token", result.access_Token);
              localStorage.setItem("user", result.userName);
              navigate("/");
            }
          });
        } else {
          setMessage([{ error: "Invalid User Name or Password" }]);
        }
        setLoading(false);
        setValidated(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <Card>
        <Card.Body>
          <Row>
            <Col className="p-5">
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                method="POST"
              >
                {messages.map((item) => (
                  <li className="text-danger" key={item}>
                    {item.error && item.error}
                  </li>
                ))}

                <Row className="mb-3">
                  <Form.Group>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      name="userName"
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      name="password"
                      type="password"
                      maxLength="30"
                      required
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Col>
                    <NavLink to="/rgister" className="nav-link">
                      Create Account
                    </NavLink>
                  </Col>
                </Row>

                {loading ? (
                  <Button variant="primary" disabled className="float-end">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button>
                ) : (
                  <Button variant="primary" type="submit" className="float-end">
                    Login
                  </Button>
                )}
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LogIn;
