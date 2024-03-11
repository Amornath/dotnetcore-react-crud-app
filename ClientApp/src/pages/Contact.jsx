import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Spinner,
  Table,
  Offcanvas,
  Pagination,
} from "react-bootstrap";

import { useState, Fragment, useEffect } from "react";
import TopNavigation from "../components/layout/TopNavigation";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [validated, setValidated] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL +
            "Contact?" +
            new URLSearchParams(searchCriteria),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_Token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setContactList(jsonData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Perform cleanup if needed
    };
  }, [searchCriteria, toggle]);

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    setContact({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const isValidEmailFormat = (email) => {
    // email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const saveContact = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (isValidEmailFormat(contact.email)) {
      setIsValidEmail(true);
    } else {
      // Invalid email format, set validation flag to false
      setIsValidEmail(false);
      return;
    }

    const methodType = contact.id ? "PUT" : "POST";
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "Contact", {
      method: methodType,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_Token")}`,
      },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Data Added Successfuly", {
            position: "bottom-right",
          });
          setToggle(!toggle);
        } else {
          response.json().then((data) => {
            toast.error(response.statusText + " - " + data.Message, {
              position: "bottom-right",
            });
          });
        }
        setValidated(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteContact = (id) => {
    fetch(import.meta.env.VITE_API_URL + "Contact/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_Token")}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          toast.warn("Data Deleted Successfuly", {
            position: "bottom-right",
          });
          setToggle(!toggle);
        } else {
          response.json().then((data) => {
            toast.error(response.statusText + " - " + data.Message, {
              position: "bottom-right",
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <TopNavigation />
      <Row className="mt-3">
        <Col className="text-end">
          <Button
            onClick={() => {
              setContact({ name: "", email: "", phoneNumber: "", address: "" });
              setShowCanvas(true);
              setIsValidEmail(true);
            }}
            variant="btn btn-outline-primary"
          >
            Add New Contact
          </Button>
        </Col>
      </Row>
      <Row className="mt-2 mb-2">
        <Col>
          <Card>
            <Card.Body>
              <Table responsive hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {contactList.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <b>No data found!</b>
                      </td>
                    </tr>
                  )}
                  {contactList.map((item, index) => (
                    <tr
                      onClick={() => setContact(item)}
                      className={item.id === contact.id ? "table-active" : ""}
                      key={item.id}
                    >
                      <td>
                        {" "}
                        {searchCriteria.pageIndex * searchCriteria.pageSize -
                          searchCriteria.pageSize +
                          index +
                          1}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.address}</td>
                      <td>
                        <Button
                          variant="btn btn-sm btn-outline-primary"
                          onClick={() => setShowCanvas(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                        </Button>
                        <Button
                          variant="btn btn-sm btn-outline-danger ms-1"
                          onClick={() => deleteContact(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination className="float-end">
                <Pagination.Prev
                  onClick={() =>
                    setSearchCriteria({
                      ...searchCriteria,

                      pageIndex:
                        searchCriteria.pageIndex === 1
                          ? 1
                          : searchCriteria.pageIndex - 1,
                    })
                  }
                  disabled={searchCriteria.pageIndex === 0}
                />

                <Pagination.Next
                  onClick={() =>
                    setSearchCriteria({
                      ...searchCriteria,

                      pageIndex: searchCriteria.pageIndex + 1,
                    })
                  }
                />
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Offcanvas
        show={showCanvas}
        onHide={() => setShowCanvas(false)}
        placement="end"
        className="w-50"
        scroll={false}
        backdrop="static"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Contact</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={saveContact}
                method="POST"
              >
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="name"
                      value={contact.name}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="email"
                      value={contact.email}
                      required
                    />
                    {!isValidEmail && (
                      <p style={{ color: "red" }}>Invalid email format</p>
                    )}
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="phoneNumber"
                      value={contact.phoneNumber}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="address"
                      value={contact.address}
                      required
                    />
                  </Form.Group>
                </Row>

                <Button
                  variant="light"
                  type="cancel"
                  onClick={handleReset}
                  as={Col}
                >
                  Reset
                </Button>
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
                    {contact.id ? "Update" : "Save"}
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
      <ToastContainer autoClose={2000} />
    </Fragment>
  );
};

export default Contact;
