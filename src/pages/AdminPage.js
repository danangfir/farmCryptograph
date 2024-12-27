import React, { useState, useEffect } from "react";
import { getProductContract, getAccessControlContract, checkCurrentNetwork } from "../utils/eth";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const productContract = await getProductContract();
        const productCount = await productContract.getProductCount();
        const productsFromBlockchain = [];
    
        for (let i = 1; i <= productCount; i++) {
          const product = await productContract.getProduct(i);
          productsFromBlockchain.push({
            id: i,
            name: product[0],
            category: product[1],
            origin: product[2],
            ipfsHash: product[3],
          });
        }
    
        setProducts(productsFromBlockchain);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }      
    fetchData();
  }, []);
  

  const logAction = (action) => {
    setLogs([...logs, { action, timestamp: new Date().toLocaleString() }]);
  };

  const handleAddProduct = async () => {
    try {
      const productContract = await getProductContract();
  
      // Transaksi untuk menambahkan produk baru
      const tx = await productContract.addProduct(
        "Produk Baru",
        "Sayuran",
        "Jawa Tengah",
        "QmHashIPFS"
      );
      await tx.wait(); // Tunggu transaksi selesai
  
      logAction("Produk baru berhasil ditambahkan ke blockchain.");
      await fetchData(); // Panggil ulang fetchData untuk memuat produk terbaru
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };  
  
  const handleAddUser = async () => {
    try {
      const accessControlContract = await getAccessControlContract();
      const tx = await accessControlContract.grantRole(
        "0x1234567890abcdef1234567890abcdef12345678",
        "Farmer"
      );
      await tx.wait();
      logAction("Pengguna baru berhasil ditambahkan ke blockchain.");
      setUsers((prev) => [
        ...prev,
        {
          id: users.length + 1,
          name: "Pengguna Baru",
          role: "Farmer",
        },
      ]);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter((user) =>
    roleFilter ? user.role === roleFilter : true
  );

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><p className="text-lg font-medium text-gray-600">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Page</h1>
      <p className="text-gray-600 mb-6">Selamat datang, Admin! Anda memiliki akses penuh.</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Statistik</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-500">Total Produk</p>
            <p className="text-2xl font-bold text-gray-800">{products.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-500">Total Pengguna</p>
            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-500">Farmer</p>
            <p className="text-2xl font-bold text-gray-800">{users.filter((user) => user.role === "Farmer").length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-500">Customer</p>
            <p className="text-2xl font-bold text-gray-800">{users.filter((user) => user.role === "Customer").length}</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manajemen Produk</h2>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Cari Produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Tambah Produk
          </button>
        </div>
        <table className="w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Nama Produk</th>
              <th className="text-left p-4">Kategori</th>
              <th className="text-left p-4">Pemilik</th>
              <th className="text-left p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-4">{product.id}</td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.owner}</td>
                <td className="p-4">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button className="text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manajemen Pengguna</h2>
        <div className="flex items-center gap-4 mb-4">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua</option>
            <option value="Farmer">Farmer</option>
            <option value="Customer">Customer</option>
          </select>
          <button
            onClick={handleAddUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Tambah Pengguna
          </button>
        </div>
        <table className="w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Nama</th>
              <th className="text-left p-4">Peran</th>
              <th className="text-left p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <button className="text-blue-500 hover:underline mr-2">Edit</button>
                  <button className="text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Log Aktivitas</h2>
        <ul className="bg-white shadow rounded-lg p-4 space-y-2">
          {logs.map((log, index) => (
            <li key={index} className="text-gray-600">
              {log.action} - {log.timestamp}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminPage;