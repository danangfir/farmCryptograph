import React, { useState, useEffect } from "react";
import { getProductContract } from "../utils/eth";
import { Pie, Bar } from "react-chartjs-2";

const AnalyticsPage = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [verifiedProducts, setVerifiedProducts] = useState(0);
  const [unverifiedProducts, setUnverifiedProducts] = useState(0);
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const contract = await getProductContract();
        const productCount = await contract.getProductCount();

        let verified = 0;
        const categories = {};

        for (let i = 1; i <= productCount; i++) {
          const product = await contract.getProduct(i);
          if (product.verified) verified++;

          // Hitung jumlah kategori
          categories[product.category] = (categories[product.category] || 0) + 1;
        }

        setTotalProducts(productCount);
        setVerifiedProducts(verified);
        setUnverifiedProducts(productCount - verified);
        setCategoryData(categories);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  // Data untuk Pie Chart
  const pieData = {
    labels: ["Produk Diverifikasi", "Produk Belum Diverifikasi"],
    datasets: [
      {
        data: [verifiedProducts, unverifiedProducts],
        backgroundColor: ["#4CAF50", "#FFC107"],
        hoverBackgroundColor: ["#45A049", "#FFB300"],
      },
    ],
  };

  // Data untuk Bar Chart
  const barData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Jumlah Produk per Kategori",
        data: Object.values(categoryData),
        backgroundColor: "#2196F3",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Dashboard Analitik</h1>

      {/* Statistik Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 text-center p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-blue-800">{totalProducts}</h2>
          <p className="text-gray-600">Total Produk</p>
        </div>
        <div className="bg-green-100 text-center p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-green-800">{verifiedProducts}</h2>
          <p className="text-gray-600">Produk Diverifikasi</p>
        </div>
        <div className="bg-yellow-100 text-center p-6 rounded shadow">
          <h2 className="text-2xl font-bold text-yellow-800">{unverifiedProducts}</h2>
          <p className="text-gray-600">Produk Belum Diverifikasi</p>
        </div>
      </div>

      {/* Grafik Analitik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Status Produk</h3>
          <Pie data={pieData} />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Kategori Produk</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
