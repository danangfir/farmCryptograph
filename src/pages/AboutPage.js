import React from "react";
import { FaSeedling, FaShieldAlt } from "react-icons/fa";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Tentang Aplikasi
        </h1>

        <p className="text-gray-600 text-lg mb-8 text-center">
          Sistem Jejak Asal Produk Pertanian adalah platform berbasis blockchain
          yang memastikan transparansi, keaslian, dan kualitas produk pertanian dari petani
          hingga konsumen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <FaSeedling className="text-green-600 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Keberlanjutan</h3>
            <p className="text-gray-600 mt-2">
              Meningkatkan praktik pertanian yang berkelanjutan dan adil.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <FaSeedling className="text-blue-600 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Blockchain</h3>
            <p className="text-gray-600 mt-2">
              Mencatat jejak produk secara transparan dengan teknologi blockchain.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-yellow-100 p-4 rounded-full mb-4">
              <FaShieldAlt className="text-yellow-600 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Keamanan</h3>
            <p className="text-gray-600 mt-2">
              Menjamin keamanan data yang tidak dapat diubah dan meminimalkan manipulasi.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Fitur Utama</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              Transparansi penuh dari perjalanan produk pertanian dengan pencatatan berbasis blockchain.
            </li>
            <li>
              Integrasi IPFS untuk penyimpanan data yang aman dan memastikan keaslian metadata produk.
            </li>
            <li>
              Meminimalkan risiko manipulasi melalui data yang tidak dapat diubah.
            </li>
            <li>
              Otomasi proses pencatatan dan transfer produk dengan smart contracts.
            </li>
            <li>
              Jejak audit yang efisien untuk mempermudah proses verifikasi dan audit.
            </li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
