// Updated Navbar Component with Seats and Booking Functionality
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import axios from "axios";
import "./Navbar.css"; // Import the CSS file

const timeSlots = [
  "10:00 - 10:30",
  "10:30 - 11:00",
  "11:00 - 11:30",
  "11:30 - 12:00",
  "12:00 - 12:30",
  "12:30 - 01:00",
  "01:00 - 01:30",
  "01:30 - 02:00",
  "02:00 - 02:30",
  "02:30 - 03:00",
];

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [balance, setBalance] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seats, setSeats] = useState(Array(50).fill(false)); // Tracks booked seats

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get("http://localhost:8082/api/v1/manager-coins", {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId },
        });
        setBalance(response.data);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  const fetchBlockedSeats = async () => {
    if (!selectedDate || !selectedTime) return;
    const token = localStorage.getItem("token");
    const location = localStorage.getItem("selectedCafeteria") || "Main Hall";
    try {
      const response = await axios.get("http://localhost:8082/api/v1/seats", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          date: selectedDate.format("YYYY-MM-DD"),
          time: selectedTime,
          location,
        },
      });
      const blockedSeats = response.data;

      const updatedSeats = Array(50).fill(false);
      blockedSeats.forEach((seat) => {
        updatedSeats[seat - 1] = true;
      });
      setSeats(updatedSeats);
    } catch (error) {
      console.error("Error fetching blocked seats:", error);
    }
  };

  useEffect(() => {
    fetchBlockedSeats();
  }, [selectedDate, selectedTime]);

  const handleSeatSelect = (index) => {
    setSelectedSeat(index);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || selectedSeat === null) {
      alert("Please select a date, time, and seat before booking.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const location = localStorage.getItem("selectedCafeteria") || "Main Hall";

    try {
      await axios.post(
        "http://localhost:8082/api/v1/seats",
        {
          date: selectedDate.format("YYYY-MM-DD"),
          time: selectedTime,
          userId,
          seatNo: selectedSeat + 1,
          location,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedSeats = [...seats];
      updatedSeats[selectedSeat] = true;
      setSeats(updatedSeats);
      setSelectedSeat(null);

      setBalance(balance - 50);

      alert("Seat booked successfully!");
    } catch (error) {
      console.error("Error booking seat:", error);
      alert("Failed to book the seat. Please try again.");
    }
  };

  const handleNavigateToBookedSeats = () => {
    navigate("/booked-seats"); // Navigate to the booked seats page
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#1e88e5", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Time Selector */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              select
              label="Select Time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                minWidth: 150,
              }}
            >
              {timeSlots.map((slot) => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Title */}
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            Seat Reservation System
          </Typography>

          {/* Date Selector, Balance, and Booked Seats */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                disablePast
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      bgcolor: "white",
                      borderRadius: 1,
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            {/* Balance Icon and Amount */}
            <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
              <AccountBalanceWalletIcon sx={{ marginRight: 1 }} />
              <Typography variant="h6">₹{balance}</Typography>
            </Box>

            {/* Booked Seats Icon */}
            <Box
              sx={{ display: "flex", alignItems: "center", color: "white", cursor: "pointer" }}
              onClick={handleNavigateToBookedSeats} // Navigate on click
            >
              <EventSeatIcon sx={{ marginRight: 1 }} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gap: 2,
            justifyContent: "center",
            mt: 2,
          }}
        >
          {seats.map((booked, index) => (
            <Button
              key={index}
              variant={booked ? "contained" : selectedSeat === index ? "contained" : "outlined"}
              color={booked ? "error" : selectedSeat === index ? "success" : "primary"}
              disabled={booked}
              onClick={() => handleSeatSelect(index)}
              sx={{
                width: 40,
                height: 40,
                textAlign: "center",
              }}
            >
              {index + 1}
            </Button>
          ))}
        </Box>
        {selectedSeat !== null && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleBooking}
              sx={{ px: 4, py: 1 }}
            >
              Book
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Navbar;
