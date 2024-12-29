import React, { useState, useEffect } from "react";
import { getProductContract } from "../utils/eth";

function CustomerPage() {
  const [products, setProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productContract = await getProductContract();
      const productCount = await productContract.getProductCount();
      const productsFromBlockchain = [];

      for (let i = 1; i <= productCount; i++) {
        const product = await productContract.getProduct(i);
        productsFromBlockchain.push({
          id: i,
          name: product.name,
          category: product.category,
          origin: product.origin,
          ipfsHash: product.ipfsHash,
          owner: product.currentOwner,
        });
      }
      setProducts(productsFromBlockchain);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyProduct = async (productId) => {
    try {
      const productContract = await getProductContract();
      const tx = await productContract.transferProduct(productId, "YOUR_WALLET_ADDRESS"); // Ganti dengan alamat pelanggan
      await tx.wait();
      console.log("Produk berhasil dibeli!");
      fetchProducts(); // Refresh produk setelah transaksi
    } catch (error) {
      console.error("Error buying product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Halaman Pelanggan</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Daftar Produk Tersedia</h2>
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
                <th className="p-3">Aksi</th>
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
                    <button
                      onClick={() => handleBuyProduct(product.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Beli
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Riwayat Pembelian</h2>
        {purchasedProducts.length === 0 ? (
          <p>Anda belum membeli produk.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Tanggal Pembelian</th>
              </tr>
            </thead>
            <tbody>
              {purchasedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="p-3">{product.id}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.purchaseDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default CustomerPage;
