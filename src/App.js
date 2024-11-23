import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Navbar"; 
import HomePage from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import AdminPage from "./pages/AdminPage";
import FarmerPage from "./pages/FarmerPage";
import CustomerPage from "./pages/CustomerPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  const isAuthenticated = true; 

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && <Sidebar />} {/* Navbar hanya muncul setelah login */}
        <div className="ml-64 w-full p-6 ">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/farmer" element={<FarmerPage />} />
            <Route path="/customer" element={<CustomerPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
