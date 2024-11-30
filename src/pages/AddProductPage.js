import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers, BigNumber } from "ethers"; // Import BigNumber

function AddProductPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [origin, setOrigin] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState(null); 

  const navigate = useNavigate();

  const categories = ["Buah-buahan", "Sayuran", "Daging", "Produk Olahan"]; 

  async function requestAccount() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error("User rejected the request:", error);
        throw new Error("Gagal menghubungkan wallet. Pastikan Anda mengizinkan permintaan di MetaMask.");
      }
    } else {
      throw new Error("MetaMask tidak terdeteksi! Pastikan MetaMask sudah terpasang.");
    }
  }

  async function getContract() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contractABI = [
      "function addProduct(string _name, string _category, string _origin, string _ipfsHash) external",
    ];
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  const handleAddProduct = async () => {
    if (!name || !category || !origin || !ipfsHash) {
      setMessage({ type: "error", text: "Semua field harus diisi!" });
      return;
    }

    try {
      setLoading(true); 
      setMessage(null); 

      await requestAccount();
      const contract = await getContract();
      const tx = await contract.addProduct(name, category, origin, ipfsHash, {
        gasLimit: BigInt("100000"), // Use BigInt from ethers v6+
      });      
      await tx.wait();

      setMessage({ type: "success", text: `Produk "${name}" berhasil ditambahkan!` });

      // Reset form
      setName("");
      setCategory("");
      setOrigin("");
      setIpfsHash("");

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error menambahkan produk:", error);
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tambah Produk</h2>

        {message && (
          <div
            className={`p-3 mb-4 text-white text-center rounded ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          type="text"
          placeholder="Nama Produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Asal"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="text"
          placeholder="IPFS Hash"
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          onClick={handleAddProduct}
          disabled={loading}
          className={`w-full p-3 rounded text-white ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          } transition duration-300`}
        >
          {loading ? "Menambahkan Produk..." : "Tambah Produk"}
        </button>
      </div>
    </div>
  );
}

export default AddProductPage;