import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 p-4 text-white">
    <Link to="/" className="mr-4">Home</Link>
    <Link to="/register" className="mr-4">Register Product</Link>
  </nav>
);

export default Navbar;
