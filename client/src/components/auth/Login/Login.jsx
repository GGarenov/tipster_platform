import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";
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
    <div className="login-page">
      <Container className="d-flex justify-content-center align-items-center login-container">
        <Card className="auth-card shadow-lg">
          <Card.Body>
            <div className="auth-header text-center mb-3">
              <div className="logo-circle mx-auto mb-3">
                <FaSignInAlt size={28} className="logo-icon" />
              </div>
              <h3 className="mb-1">Welcome Back</h3>
              <p className="text-muted small">
                Sign in to publish tips and track your stats
              </p>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="d-grid gap-2 mb-3">
              <Button
                variant="outline-light"
                className="social-btn google"
                onClick={() => alert("Google login placeholder")}
              >
                <FaGoogle className="me-2" /> Continue with Google
              </Button>
              <Button
                variant="outline-light"
                className="social-btn github"
                onClick={() => alert("GitHub login placeholder")}
              >
                <FaGithub className="me-2" /> Continue with GitHub
              </Button>
            </div>

            <div className="divider">or</div>

            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon">
                    <FaEnvelope />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="your@email.com"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    className="form-input"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon">
                    <FaLock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    className="form-input"
                  />
                </InputGroup>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 btn-cta fw-bold"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <small className="text-muted">
                Don't have an account?{" "}
                <Link to="/register" className="link-register">
                  Create one
                </Link>
              </small>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
