// components/Login.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8081/api/v1/login", {
        username,
        password,
      });
      

      // Store token and user ID in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      alert("Login successful!");

      // test
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      console.log("Token:", token);
      console.log("User ID:", userId);
      navigate("/cafe");

    } catch (error) {
      alert("Login failed: " + error.response.data);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default Login;

