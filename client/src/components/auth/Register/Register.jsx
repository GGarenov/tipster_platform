import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  // State for form inputs (add username for your platform)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false); // For Bootstrap validation

  const { username, email, password, confirmPassword } = formData;

  // Handle input changes
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // 1. Basic Client-Side Validation
    if (form.checkValidity() === false || password !== confirmPassword) {
      e.stopPropagation();
      setValidated(true);
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
      } else {
        setError("Please fill out all required fields.");
      }
      return;
    }

    setValidated(true); // Enable validation styling
    setLoading(true);
    setError(null);

    // --- TODO: API CALL LOGIC ---
    try {
      // 2. You will use Axios here to hit your backend:
      // Example: const res = await axios.post('/api/auth/register', { username, email, password });

      // MOCK REGISTRATION SUCCESS FOR NOW
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API delay

      console.log("Registration Successful for:", username);

      // Redirect user to login page after successful registration
      navigate("/login");
    } catch (err) {
      console.error(err);
      // Handle specific backend errors (e.g., email already exists)
      setError(
        err.response?.data?.message ||
          "Registration failed. Try a different username/email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center register-container">
      <Card className="register-card p-4 shadow-lg">
        <Card.Body>
          <div className="text-center mb-4">
            <FaUserPlus size={40} className="text-brand-blue mb-3" />
            <h2 className="fw-bold">Create Account</h2>
            <p className="text-muted">
              Join the top football tipster community!
            </p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          {/* The `noValidate` and `validated` props enable Bootstrap's validation UI */}
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            {/* Username Field */}
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
                name="username"
                value={username}
                onChange={onChange}
                required
                className="dark-input"
              />
              <Form.Control.Feedback type="invalid">
                Username is required.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email Field */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="dark-input"
              />
              <Form.Control.Feedback type="invalid">
                Valid email is required.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password (min 6 characters)"
                name="password"
                value={password}
                onChange={onChange}
                required
                minLength="6"
                className="dark-input"
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Confirm Password Field */}
            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                required
                isInvalid={validated && password !== confirmPassword}
                className="dark-input"
              />
              <Form.Control.Feedback type="invalid">
                Passwords must match.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              className="w-100 fw-bold"
              disabled={loading}
            >
              {loading ? (
                "Registering..."
              ) : (
                <>
                  <FaUserPlus className="me-2" /> Register
                </>
              )}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-decoration-none text-brand-blue"
              >
                Log In
              </Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
