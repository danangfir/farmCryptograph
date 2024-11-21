// src/utils/eth.js
import { ethers, BrowserProvider } from "ethers";

// Fungsi untuk menghubungkan ke MetaMask
export async function requestAccount() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    alert("MetaMask tidak terdeteksi!");
  }
}

// Fungsi untuk mendapatkan instance kontrak AccessControl
export async function getAccessControlContract() {
  const contractAddress = "ALAMAT_KONTRAK_ACCESS_CONTROL"; // Ganti dengan alamat kontrak Anda
  const contractABI = [
    "function isAdmin(address) view returns (bool)",
    "function isFarmer(address) view returns (bool)",
    "function isCustomer(address) view returns (bool)",
    "function grantRole(address, string)",
    "function revokeRole(address, string)"
  ];

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
}

// Fungsi untuk mendapatkan instance kontrak Produk
export async function getProductContract() {
  const contractAddress = "ALAMAT_KONTRAK_PRODUK"; // Ganti dengan alamat kontrak produk Anda
  const contractABI = [
    "function getProductCount() view returns (uint256)",
    "function getProduct(uint256) view returns (tuple(string name, string category, string origin, string ipfsHash))"
  ];

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
}


