// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { getContract } from "../utils/eth";
import { Link } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const contract = getContract();
      const productCount = await contract.getProductCount();  // misalnya, fungsi untuk mendapatkan jumlah produk
      const productList = [];
      
      for (let i = 1; i <= productCount; i++) {
        const product = await contract.getProductDetails(i);
        productList.push(product);
      }

      setProducts(productList);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <Link to={`/product/${index + 1}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
