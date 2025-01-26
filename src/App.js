// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Navbar from "./components/main_page/Navbar";
import CafeteriaCards from "./components/cafe/CafeteriaCards";
import UserBookedSeats from "./components/BookedSeats/UserBookedSeats";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main_page" element={<Navbar />} />
        <Route path="/cafe" element={<CafeteriaCards />} />
        <Route path="/booked-seats" element={<UserBookedSeats />} />
      </Routes>
    </Router>
  );
}

export default App;