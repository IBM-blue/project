// IBM Cafeteria Cards Component
import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const cafeterias = [
  {
    name: "IBM Cafeteria - Main Hall",
    location: "Building A, Floor 1",
    description: "A spacious cafeteria offering a variety of meals and beverages. Perfect for team lunches.",
    image: "/images/main_hall.webp",
  },
  {
    name: "IBM Cafeteria - Tech Hub",
    location: "Building C, Floor 2",
    description: "A cozy cafeteria with modern decor and quick snacks for tech enthusiasts.",
    image: "/images/tech_hub.webp",
  },
  {
    name: "IBM Cafeteria - Executive Lounge",
    location: "Building B, Floor 3",
    description: "An exclusive cafeteria offering premium meals for executives and clients.",
    image: "/images/executive_lounge.webp",
  },
  {
    name: "IBM Cafeteria - Outdoor Patio",
    location: "Building D, Ground Floor",
    description: "An open-air cafeteria with beautiful greenery and healthy food options.",
    image: "/images/outdoor_patio.webp",
  },
];

const CafeteriaCards = () => {
  const navigate = useNavigate();

  const handleExploreMore = (location) => {
    localStorage.setItem("selectedCafeteria", location);
    navigate("/main_page");
  };

  return (
    <Box
      sx={{
        padding: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#1e88e5", marginBottom: 3, textAlign: "center" }}
      >
        Cafes
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 3,
        }}
      >
        {cafeterias.map((cafeteria, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              sx={{
                maxWidth: 400,
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
                transition: "transform 0.2s",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  width: "100%", // Ensures the image spans the full width of the card
                  objectFit: "cover", // Ensures the image covers the entire area
                }}
                image={cafeteria.image}
                alt={cafeteria.name}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginBottom: 2, color: "#1e88e5" }}
                >
                  {cafeteria.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontStyle: "italic", marginBottom: 2, color: "#6c757d" }}
                >
                  Location: {cafeteria.location}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginBottom: 3, color: "#212529" }}
                >
                  {cafeteria.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleExploreMore(cafeteria.location)}
                >
                  Explore More
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default CafeteriaCards;
