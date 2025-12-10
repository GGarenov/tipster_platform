import React from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaFutbol, FaUserCircle, FaPlus } from "react-icons/fa";
import "./Navbar.css";

const Navigation = () => {
  const navigate = useNavigate();

  const isLoggedIn = false;
  const user = { username: "TipsterKing" };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" variant="dark" className="custom-navbar sticky-top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center fw-bold brand-text"
        >
          <FaFutbol className="me-2 text-green" size={24} />
          Tipster<span className="text-white">Platform</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-3">
            <Nav.Link as={Link} to="/">
              Feed
            </Nav.Link>
            <Nav.Link as={Link} to="/all-tips">
              All Tips
            </Nav.Link>
            <Nav.Link as={Link} to="/all-tips">
              Add Tip
            </Nav.Link>
            <Nav.Link as={Link} to="/ranking">
              Tipsters
            </Nav.Link>
          </Nav>

          <Nav>
            {isLoggedIn ? (
              <>
                <Button
                  as={Link}
                  to="/add-tip"
                  variant="primary"
                  className="me-3 d-flex align-items-center btn-sm"
                >
                  <FaPlus className="me-1" /> Post Tip
                </Button>

                <NavDropdown
                  title={
                    <span className="d-flex align-items-center">
                      <FaUserCircle size={20} className="me-2 text-muted" />
                      {user.username}
                    </span>
                  }
                  id="user-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    My Stats
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={handleLogout}
                    className="text-danger"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <div className="d-flex gap-2">
                <Button as={Link} to="/login" variant="outline-light" size="sm">
                  Log In
                </Button>
                <Button as={Link} to="/register" variant="primary" size="sm">
                  Join Now
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
