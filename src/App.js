import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/user/Home";
import Profile from "./pages/user/Profile";
import Restaurant from "./pages/user/Restaurant";
import Cart from "./pages/user/Cart";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Restaurants from "./pages/admin/Restaurants";
import Login from "./pages/user/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        {user && user.role === "admin" && (
          <>
            <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute role="admin"><Orders /></ProtectedRoute>} />
            <Route path="/admin/restaurants" element={<ProtectedRoute role="admin"><Restaurants /></ProtectedRoute>} />
          </>
        )}

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
