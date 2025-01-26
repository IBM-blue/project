import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

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

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      alert("Login successful!");
      navigate("/cafe");
    } catch (error) {
      alert("Login failed: " + error.response.data);
    }
  };

  return (
    <div className="login-container">
      <Container maxWidth="xs" className="login-card">
        <Box>
          <Typography variant="h4" gutterBottom className="login-title">
            Login
          </Typography>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{ className: "login-input" }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ className: "login-input" }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            className="login-button"
          >
            Login
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
