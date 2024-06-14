import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import newRequest from "../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "", // Added retypePassword state
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!user.name || !user.email || !user.password || !user.retypePassword) {
      setError("All fields are required");
      return;
    }

    if (user.password !== user.retypePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await newRequest.post("/auth/register", { ...user });
      navigate("/auth/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", err);
    }
  };

  return (
    <Container
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 400 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box marginBottom={2}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                required
                onChange={handleChange}
              />
            </Box>
            <Box marginBottom={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                required
                onChange={handleChange}
              />
            </Box>
            <Box marginBottom={2}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                required
                onChange={handleChange}
              />
            </Box>
            <Box marginBottom={2}>
              <TextField
                fullWidth
                label="Retype Password"
                type="password"
                name="retypePassword"
                variant="outlined"
                required
                onChange={handleChange}
              />
            </Box>

            {error && (
              <Typography variant="body2" color="error" paragraph>
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
