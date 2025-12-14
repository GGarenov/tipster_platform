import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import { FaSignInAlt, FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import { loginUser } from "../../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        const role = data.payload.user?.role;
        toast.success(data.payload.message || "Logged in", { theme: "dark" });
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        const message =
          data?.payload?.message ||
          data?.error?.message ||
          "Login failed. Check your credentials.";
        toast.error(message, { theme: "dark" });
      }
    });
  }

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
              <Form.Group className="mb-3" controlId={`formBasicEmail`}>
                <Form.Label className="form-label">Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon"></InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    required
                    className="form-input"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId={`formBasicPassword`}>
                <Form.Label className="form-label">Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon"></InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
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
                disabled={isLoading}
              >
                {isLoading ? "Logging In..." : "Log In"}
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
}

export default AuthLogin;
