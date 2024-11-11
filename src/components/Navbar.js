import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 p-4 text-white shadow-lg">
    <div className="container mx-auto flex justify-between">
      <h1 className="text-2xl font-bold">
        <Link to="/">Tracking Produk Pertanian</Link>
      </h1>
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/add-product" className="hover:text-gray-200">Tambah Produk</Link>
        <Link to="/about" className="hover:text-gray-200">Tentang</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
