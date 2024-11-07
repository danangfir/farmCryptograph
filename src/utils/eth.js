import { ethers } from "ethers";

export function getProvider() {
  // Menggunakan provider lokal jika Metamask tidak terdeteksi
  const networkUrl = process.env.REACT_APP_NETWORK_URL || "http://localhost:8545";
  return new ethers.JsonRpcProvider(networkUrl);
}

export async function getContract() {
  const provider = getProvider();
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  // Ganti dengan ABI kontrak Anda
  const contractABI = [
    "function createProductNFT(address to, string memory tokenURI) public returns (uint256)",
    "function getProduct(uint256 tokenId) public view returns (string)"
  ];

  return new ethers.Contract(contractAddress, contractABI, provider);
}
