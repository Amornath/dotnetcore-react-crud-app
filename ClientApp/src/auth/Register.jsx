import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Form, Row, Button, Spinner } from "react-bootstrap";

const Register = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({ userName: "", password: "", email: "" });
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const isValidEmailFormat = (email) => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    if (isValidEmailFormat(user.email)) {
      setIsValidEmail(true);
    } else {
      // Invalid email format, set validation flag to false
      setIsValidEmail(false);
      return;
    }

    setLoading(true);

    fetch(import.meta.env.VITE_API_URL + "Auth/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/login");
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
                <Row className="mb-3">
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      name="email"
                      required
                    />
                    {!isValidEmail && (
                      <p style={{ color: "red" }}>Invalid email format</p>
                    )}
                  </Form.Group>
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
                    Register
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

export default Register;
