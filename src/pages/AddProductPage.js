// src/pages/AddProductPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

function AddProductPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [origin, setOrigin] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const navigate = useNavigate(); // Untuk navigasi ke halaman lain setelah menambah produk

  // Fungsi untuk menghubungkan wallet MetaMask
  async function requestAccount() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error("User rejected the request:", error);
        alert("Gagal menghubungkan wallet. Pastikan Anda mengizinkan permintaan di MetaMask.");
      }
    } else {
      alert("MetaMask tidak terdeteksi! Pastikan MetaMask sudah terpasang.");
    }
  }

  // Fungsi untuk mendapatkan kontrak menggunakan ethers v6
  async function getContract() {
    const provider = new ethers.BrowserProvider(window.ethereum); // Menggunakan BrowserProvider dari MetaMask di ethers v6
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; // Alamat kontrak yang sudah di-deploy
    const contractABI = [
      "function addProduct(string _name, string _category, string _origin, string _ipfsHash) external",
      "function getProduct(uint256 _id) external view returns (tuple(uint256 id, string name, string category, string origin, string ipfsHash, address owner, bool verified))",
      "function getProductCount() external view returns (uint256)"
    ];
    const signer = await provider.getSigner(); // Mengambil signer dari MetaMask
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  // Fungsi untuk menambah produk
  const handleAddProduct = async () => {
    if (!name || !category || !origin || !ipfsHash) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      await requestAccount(); // Panggil fungsi untuk menghubungkan wallet

      const contract = await getContract();
      const tx = await contract.addProduct(name, category, origin, ipfsHash);
      await tx.wait(); // Menunggu transaksi selesai
      alert("Produk berhasil ditambahkan!");

      // Reset form setelah submit
      setName("");
      setCategory("");
      setOrigin("");
      setIpfsHash("");

      // Navigasi ke halaman Home setelah berhasil menambah produk
      navigate("/");
    } catch (error) {
      console.error("Error menambahkan produk:", error);
      alert("Gagal menambahkan produk. Pastikan wallet terhubung dan kontrak dapat diakses.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tambah Produk</h2>
        <input
          type="text"
          placeholder="Nama Produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Asal"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="IPFS Hash"
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddProduct}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Tambah Produk
        </button>
      </div>
    </div>
  );
}

export default AddProductPage;
