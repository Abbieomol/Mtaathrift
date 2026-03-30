import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Customer from "./pages/Customer";
import Vendor from "./pages/Vendor";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import type { User } from "./types/types";
import ProtectedRoute from "./routes/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const getUserFromStorage = (): User | null => {
    try {
      const data = localStorage.getItem("user");
      if (!data || data === "undefined") return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  const user: User | null = getUserFromStorage();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/search" element={
          <ProtectedRoute allowedRoles={["customer", "vendor"]}>
            <Search />
          </ProtectedRoute>
        } />

        <Route path="/notifications" element={
          <ProtectedRoute allowedRoles={["customer", "vendor"]}>
            <Notifications />
          </ProtectedRoute>
        } />

        <Route path="/cart" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <Cart />
          </ProtectedRoute>
        } />

        <Route path="/wishlist" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <Wishlist />
          </ProtectedRoute>
        } />

        <Route path="/customer" element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <Customer />
          </ProtectedRoute>
        } />

        <Route path="/vendor" element={
          <ProtectedRoute allowedRoles={["vendor"]}>
            <Vendor />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
