import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { email, password } = formData;

  // Handle input changes
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // --- TODO: API CALL LOGIC ---
    try {
      // 1. You will use Axios here (once configured in src/services/api.js)
      // Example: const res = await axios.post('/api/auth/login', { email, password });

      // MOCK LOGIN SUCCESS FOR NOW
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      if (email === "test@example.com" && password === "password") {
        // 2. Save the token (JWT) you get from the backend response
        localStorage.setItem("token", "MOCK_JWT_TOKEN");

        // 3. Update global state (AuthContext)

        // 4. Redirect to the main feed/dashboard
        navigate("/");
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      // Handle actual network or validation errors from the backend here
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <Card className="login-card p-4 shadow-lg">
        <Card.Body>
          <div className="text-center mb-4">
            <FaSignInAlt size={40} className="text-green mb-3" />
            <h2 className="fw-bold">Welcome Back</h2>
            <p className="text-muted">
              Sign in to publish tips and track your stats.
            </p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmit}>
            {/* Email Field */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="dark-input"
              />
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="dark-input"
              />
            </Form.Group>

            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              className="w-100 fw-bold"
              disabled={loading}
            >
              {loading ? (
                "Logging In..."
              ) : (
                <>
                  <FaSignInAlt className="me-2" /> Log In
                </>
              )}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Don't have an account?{" "}
              <Link to="/register" className="text-decoration-none text-green">
                Register
              </Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
