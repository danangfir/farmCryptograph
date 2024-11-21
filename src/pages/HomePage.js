import React, { useEffect, useState } from "react";
import { getProductContract } from "../utils/eth";

function HomePage() {
  const [products, setProducts] = useState([]);

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

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{product.name}</h2>
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
              className="text-blue-500 underline mt-4 inline-block"
            >
              Lihat di IPFS
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
