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
  FaUserPlus,
  FaEnvelope,
  FaLock,
  FaUser,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";
import "./Register.css";
import { registerUser } from "../../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  // State for form inputs (backend expects `userName`)
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [validated, setValidated] = useState(false); // For Bootstrap validation

  const { userName, email, password, confirmPassword } = formData;

  // Handle input changes
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // basic client-side validation
    if (form.checkValidity() === false || password !== confirmPassword) {
      e.stopPropagation();
      setValidated(true);
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.", { theme: "dark" });
      } else {
        toast.error("Please fill out all required fields.", { theme: "dark" });
      }
      return;
    }

    setValidated(true);

    // Dispatch the register thunk. Backend expects `userName`, `email`, `password`.
    dispatch(registerUser({ userName, email, password })).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message || "Registration successful", {
          theme: "dark",
        });
        navigate("/login");
      } else {
        const message =
          data?.payload?.message ||
          data?.error?.message ||
          "Registration failed.";
        toast.error(message, { theme: "dark" });
      }
    });
  };

  return (
    <div className="register-page">
      <Container className="d-flex justify-content-center align-items-center register-container">
        <Card className="auth-card shadow-lg">
          <Card.Body>
            <div className="auth-header text-center mb-3">
              <div className="logo-circle mx-auto mb-3">
                <FaUserPlus size={28} className="logo-icon" />
              </div>
              <h3 className="mb-1">Create Account</h3>
              <p className="text-muted small">
                Join the top football tipster community!
              </p>
            </div>

            {/* Keep inline alerts disabled; use toast for feedback */}

            <div className="d-grid gap-2 mb-3">
              <Button
                variant="outline-light"
                className="social-btn google"
                onClick={() => alert("Google signup placeholder")}
              >
                <FaGoogle className="me-2" /> Continue with Google
              </Button>
              <Button
                variant="outline-light"
                className="social-btn github"
                onClick={() => alert("GitHub signup placeholder")}
              >
                <FaGithub className="me-2" /> Continue with GitHub
              </Button>
            </div>

            <div className="divider">or</div>

            <Form noValidate validated={validated} onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon">
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Choose a username"
                    name="userName"
                    value={userName}
                    onChange={onChange}
                    required
                    className="form-input"
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Username is required.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon">
                    <FaEnvelope />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    className="form-input"
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Valid email is required.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon">
                    <FaLock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Password (min 6 characters)"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    minLength="6"
                    className="form-input"
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Password must be at least 6 characters.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formConfirmPassword">
                <Form.Label className="form-label">Confirm Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="input-icon">
                    <FaLock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    required
                    isInvalid={validated && password !== confirmPassword}
                    className="form-input"
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Passwords must match.
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 btn-cta fw-bold"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Create Account"}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <small className="text-muted">
                Already have an account?{" "}
                <Link to="/login" className="link-register">
                  Log in
                </Link>
              </small>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
