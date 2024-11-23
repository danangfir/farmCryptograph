import React, { useEffect, useState } from "react";
import { getProductContract } from "../utils/eth";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fungsi untuk menghubungkan wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setErrorMessage("MetaMask tidak terdeteksi. Silakan pasang MetaMask.");
        return;
      }
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletConnected(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setErrorMessage("Gagal menghubungkan dompet.");
    }
  };

  // Fetch produk dari blockchain
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const contract = await getProductContract();
        const productCount = await contract.getProductCount();
        const productList = [];

        for (let i = 1; i <= productCount; i++) {
          const product = await contract.getProduct(i);
          productList.push(product);
        }

        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (walletConnected) {
      fetchProducts();
    }
  }, [walletConnected]);

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex-1 p-8 md:p-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Web3 Agriculture Marketplace
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Platform berbasis blockchain untuk transaksi aman, transparan, dan
          terdesentralisasi dalam rantai pasok produk pertanian.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={connectWallet}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {walletConnected ? "Wallet Connected" : "Connect Wallet"}
          </button>
          <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition">
            Learn More
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-gray-50 p-8 md:p-16">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Produk Terdaftar
          </h2>
          {walletConnected ? (
            <div className="grid grid-cols-1 gap-4">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg p-4 shadow hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">
                      <strong>Kategori:</strong> {product.category}
                    </p>
                    <p className="text-gray-600">
                      <strong>Asal:</strong> {product.origin}
                    </p>
                    <a
                      href={`https://ipfs.io/ipfs/${product.ipfsHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Lihat Metadata
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Tidak ada produk ditemukan.</p>
              )}
            </div>
          ) : (
            <p className="text-gray-600">
              Hubungkan dompet Anda untuk melihat daftar produk.
            </p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Tambah Kontrak Baru
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600">Contract (buyer)</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-gray-600">Contractor (seller)</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
