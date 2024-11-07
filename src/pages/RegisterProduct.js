// src/pages/RegisterProduct.js
import React, { useState } from "react";
import { uploadToIPFS } from "../utils/ipfs"; // Pastikan hanya import `uploadToIPFS`
import { getContract } from "../utils/eth";

const RegisterProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);

  const handleRegisterProduct = async () => {
    try {
      const imageHash = await uploadToIPFS(productImage);

      const contract = await getContract();
      const transaction = await contract.createProductNFT("0xRecipientAddress", imageHash);

      console.log("Transaction:", transaction);
    } catch (error) {
      console.error("Error registering product:", error);
    }
  };

  return (
    <div>
      <h1>Register Product</h1>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product Name"
      />
      <textarea
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        placeholder="Product Description"
      ></textarea>
      <input
        type="file"
        onChange={(e) => setProductImage(e.target.files[0])}
      />
      <button onClick={handleRegisterProduct}>Register</button>
    </div>
  );
};

export default RegisterProduct;
