// index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Import dari 'react-dom/client' untuk React 18
import "./index.css"; // Pastikan index.css diimpor di sini
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Menggunakan createRoot
root.render(<App />); // Merender <App /> dengan createRoot
