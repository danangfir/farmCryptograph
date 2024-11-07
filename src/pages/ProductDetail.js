// src/pages/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContract } from "../utils/eth";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const contract = getContract();
      const productData = await contract.getProductDetails(id);
      setProduct(productData);
    };

    fetchProductDetails();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>Detail Produk: {product.name}</h2>
      <p>Deskripsi: {product.description}</p>
      <p>Asal: {product.origin}</p>
      <p>Metadata IPFS: 
        <a href={`https://ipfs.io/ipfs/${product.ipfsHash}`} target="_blank" rel="noopener noreferrer">
          Lihat di IPFS
        </a>
      </p>
    </div>
  );
}

export default ProductDetail;
