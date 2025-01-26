import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import the CSS file

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
    } catch (error) {
      alert("Signup failed: " + error.response.data);
    }
  };

  return (
    <div className="signup-container">
      <Container maxWidth="xs" className="signup-card">
        <Box>
          <Typography variant="h4" gutterBottom className="signup-title">
            Signup
          </Typography>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{ className: "signup-input" }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ className: "signup-input" }}
          />
          <TextField
            label="Manager Email"
            fullWidth
            margin="normal"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
            InputProps={{ className: "signup-input" }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignup}
            className="signup-button"
          >
            Signup
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default Signup;
