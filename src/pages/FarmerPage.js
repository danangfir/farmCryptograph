import React, { useState, useEffect } from "react";
import { getProductContract, sendEthereumTransaction, checkCurrentNetwork } from "../utils/eth";
import { uploadToIPFS } from "../utils/ipfs";

function FarmerPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    origin: "",
    file: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const contract = await getProductContract();
      const productCount = await contract.getProductCount();
      const productsFromBlockchain = [];

      for (let i = 1; i <= productCount; i++) {
        const product = await contract.getProduct(i);
        productsFromBlockchain.push({
          id: i,
          name: product.name,
          category: product.category,
          origin: product.origin,
          ipfsHash: product.ipfsHash,
        });
      }
      setProducts(productsFromBlockchain);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.origin || !newProduct.file) {
      alert("Semua field harus diisi!");
      return;
    }
    setLoading(true);
    try {
      const ipfsHash = await uploadToIPFS(newProduct.file);
      const tx = await sendEthereumTransaction(
        "0xProductContractAddress",
        "0", // Nilai ETH yang dikirim
        `addProduct(${newProduct.name}, ${newProduct.category}, ${newProduct.origin}, ${ipfsHash})`
      );
      console.log("Transaksi berhasil:", tx);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Halaman Petani</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Produk Baru</h2>
        <input
          type="text"
          placeholder="Nama Produk"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-3 rounded w-full mb-4"
        />
        <input
          type="text"
          placeholder="Kategori"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="border p-3 rounded w-full mb-4"
        />
        <input
          type="text"
          placeholder="Asal"
          value={newProduct.origin}
          onChange={(e) => setNewProduct({ ...newProduct, origin: e.target.value })}
          className="border p-3 rounded w-full mb-4"
        />
        <input
          type="file"
          onChange={(e) => setNewProduct({ ...newProduct, file: e.target.files[0] })}
          className="border p-3 rounded w-full mb-4"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white p-3 rounded"
          disabled={loading}
        >
          {loading ? "Menambahkan..." : "Tambah Produk"}
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Daftar Produk Saya</h2>
        {loading ? (
          <p>Memuat produk...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Asal</th>
                <th className="p-3">IPFS Hash</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="p-3">{product.id}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.origin}</td>
                  <td className="p-3">
                    <a
                      href={`https://ipfs.io/ipfs/${product.ipfsHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FarmerPage;
