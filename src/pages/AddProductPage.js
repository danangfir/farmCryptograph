import React, { useState } from "react";
import { getContract } from "../utils/eth";

function AddProductPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [origin, setOrigin] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const handleAddProduct = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.addProduct(name, category, origin, ipfsHash);
      await tx.wait();
      alert("Produk berhasil ditambahkan!");

      // Reset form setelah submit
      setName("");
      setCategory("");
      setOrigin("");
      setIpfsHash("");
    } catch (error) {
      console.error("Error menambahkan produk:", error);
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
