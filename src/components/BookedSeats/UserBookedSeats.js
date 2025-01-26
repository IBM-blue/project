// UserBookedSeats Component
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import axios from "axios";

const UserBookedSeats = () => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [managerCoins, setManagerCoins] = useState(0); // State to track manager's coins

  const fetchBookedSeats = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(`http://localhost:8082/api/v1/seats/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookedSeats(response.data);
    } catch (error) {
      console.error("Error fetching booked seats:", error);
    }
  };

  const fetchManagerCoins = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get("http://localhost:8082/api/v1/manager-coins", {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      });
      setManagerCoins(response.data);
    } catch (error) {
      console.error("Error fetching manager coins:", error);
    }
  };

  useEffect(() => {
    fetchBookedSeats();
    fetchManagerCoins();
  }, []);

  const handleCancelBooking = async (seatId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`http://localhost:8082/api/v1/seats/${seatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert("Booking canceled successfully!");
        setBookedSeats((prev) => prev.filter((seat) => seat.id !== seatId)); // Update UI

        // Add 50 points back to the manager's coins
        setManagerCoins((prevCoins) => prevCoins + 50);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel the booking. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#1e88e5", marginBottom: 3, textAlign: "center" }}
      >
        Your Booked Seats
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <Typography variant="h6" sx={{ color: "#1e88e5" }}>
          Manager's Coins: ₹{managerCoins}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 3,
        }}
      >
        {bookedSeats.map((seat) => (
          <Card
            key={seat.id}
            sx={{
              maxWidth: 400,
              borderRadius: "16px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
              backgroundColor: "#f5f5f5",
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="https://serenityhostels.in/wp-content/uploads/2024/07/cafe.webp" // Placeholder image
              alt="Seat Image"
            />
            <CardContent>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2, color: "#1e88e5" }}
              >
                Seat #{seat.seatNo}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontStyle: "italic", marginBottom: 1, color: "#6c757d" }}
              >
                Date: {seat.date}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontStyle: "italic", marginBottom: 1, color: "#6c757d" }}
              >
                Time: {seat.time}
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, color: "#212529" }}
              >
                Location: {seat.location}
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{ borderRadius: "8px", textTransform: "none", fontWeight: "bold" }}
                onClick={() => handleCancelBooking(seat.id)}
              >
                Cancel Booking
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default UserBookedSeats;
