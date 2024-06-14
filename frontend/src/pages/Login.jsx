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
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await newRequest.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (err) {
      setError(err.response.data);
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
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box marginBottom={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box marginBottom={2}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            {error && (
              <Typography variant="body2" color="error" paragraph>
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
