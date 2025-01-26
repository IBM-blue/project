// Seats Component
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Seats = () => {
  const seatNumbers = Array.from({ length: 50 }, (_, index) => index + 1);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        gap: 2,
        justifyContent: "center",
        mt: 2,
      }}
    >
      {seatNumbers.map((seat) => (
        <Button
          key={seat}
          variant="outlined"
          sx={{
            width: 40,
            height: 40,
            textAlign: "center",
            color: "#1e88e5",
            borderColor: "#1e88e5",
          }}
        >
          {seat}
        </Button>
      ))}
    </Box>
  );
};

export default Seats;
