import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import RegisterProduct from "./pages/RegisterProduct";

function App() {
  useEffect(() => {
    const requestAccount = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        alert("MetaMask is not installed!");
      }
    };

    requestAccount();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<RegisterProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
