import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom"; // Import untuk pengalihan halaman

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [account, setAccount] = useState("");
  const navigate = useNavigate(); // Hook untuk pengalihan halaman

  const handleLogin = async () => {
    try {
      // Cek apakah MetaMask terpasang
      if (!window.ethereum) {
        setErrorMessage("MetaMask tidak terdeteksi! Pastikan MetaMask sudah terpasang.");
        return;
      }

      // Meminta akses akun ke MetaMask
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length === 0) {
        setErrorMessage("Tidak ada akun yang ditemukan di MetaMask.");
        return;
      }

      // Menyimpan alamat akun di state
      setAccount(accounts[0]);

      // Inisialisasi provider dari MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();

      console.log("Akun berhasil terhubung:", accounts[0]);
      setErrorMessage(""); // Kosongkan error message jika berhasil login

      // Redirect ke halaman lain setelah login berhasil
      navigate("/home"); // Ganti '/home' dengan rute tujuan yang sesuai

      // (Optional) Anda bisa melakukan tindakan lain di sini,
      // seperti memverifikasi akun dengan backend atau memanggil kontrak pintar
      
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Gagal login. Pastikan MetaMask terhubung dengan benar.");
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <h2>Login</h2>
        <p>Login dengan akun MetaMask Anda</p>
        <button 
          onClick={handleLogin} 
          style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Login dengan MetaMask
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {account && <p>Terhubung dengan akun: {account}</p>}
      </div>
    </div>
  );
};

export default LoginPage;