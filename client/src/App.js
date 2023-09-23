import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Account from "./pages/Account";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoom from "./pages/AdminRoom";
import AdminUser from "./pages/AdminUser";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Booking from "./pages/Booking";
import Rooms from "./pages/Rooms";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Account />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/admin_room" element={<AdminRoom />} />
          <Route path="/admin_user" element={<AdminUser />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
