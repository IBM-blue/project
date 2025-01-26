// components/Signup.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:8081/api/v1/signup", {
        username,
        password,
        managerEmail,
      });
      
      // Store token and user ID in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      alert("Signup successful!");
      navigate("/cafe");
      // navigate("/main");
    } catch (error) {
      alert("Signup failed: " + error.response.data);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Signup
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
        <TextField
          label="Manager Email"
          fullWidth
          margin="normal"
          value={managerEmail}
          onChange={(e) => setManagerEmail(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
          Signup
        </Button>
      </Box>
    </Container>
  );
}

export default Signup;
