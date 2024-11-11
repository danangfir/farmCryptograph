import { ethers } from "ethers";

// Fungsi untuk mendapatkan provider, menggunakan MetaMask jika tersedia
export function getProvider() {
  if (window.ethereum) {
    // Jika MetaMask terdeteksi, gunakan sebagai provider
    return new ethers.BrowserProvider(window.ethereum);
  } else {
    // Jika MetaMask tidak terdeteksi, fallback ke JsonRpcProvider (tanpa wallet)
    const networkUrl = process.env.REACT_APP_NETWORK_URL || "http://localhost:8545";
    return new ethers.JsonRpcProvider(networkUrl);
  }
}

// Fungsi untuk mendapatkan kontrak dengan ABI dan alamat kontrak yang benar
export async function getContract() {
  const provider = getProvider();
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  // ABI yang mencakup fungsi-fungsi di kontrak `Product.sol`
  const contractABI = [
    "function addProduct(string _name, string _category, string _origin, string _ipfsHash) external",
    "function verifyProduct(uint256 _id) external",
    "function getProduct(uint256 _id) external view returns (tuple(uint256 id, string name, string category, string origin, string ipfsHash, address owner, bool verified))",
    "function getProductCount() external view returns (uint256)"
  ];

  return new ethers.Contract(contractAddress, contractABI, provider.getSigner());
}
