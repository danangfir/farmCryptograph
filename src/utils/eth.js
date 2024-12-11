import { ethers } from "ethers";
import { 
  BrowserProvider, 
  Contract, 
  parseEther, 
  parseUnits,
  getAddress
} from "ethers";

// Fungsi untuk menghubungkan ke MetaMask
export async function connectMetaMask() {
  if (!window.ethereum) {
    throw new Error("MetaMask tidak terdeteksi!");
  }
  
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  console.log("Akun terhubung:", accounts[0]);
  return accounts[0];
}

// Fungsi untuk mendapatkan provider dan signer
export async function getEthereumProviderAndSigner() {
  await connectMetaMask();
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return { provider, signer };
}

// Fungsi untuk mendapatkan nonce dengan penanganan kesalahan
async function getCorrectNonce(provider, address) {
  try {
    return await provider.getTransactionCount(address, 'pending');
  } catch (error) {
    console.warn("Gagal mendapatkan nonce pending, kembali ke nonce on-chain:", error);
    return await provider.getTransactionCount(address);
  }
}

// Fungsi utama untuk mengirim transaksi
export async function sendEthereumTransaction(
  recipientAddress, 
  amountInEther, 
  additionalData = '0x',
  customGasLimit = 300000,
  customGasPrice = '20'
) {
  try {
    const { provider, signer } = await getEthereumProviderAndSigner();
    const senderAddress = await signer.getAddress();
    const nonce = await getCorrectNonce(provider, senderAddress);
    const validatedRecipientAddress = getAddress(recipientAddress);
    
    const txParams = {
      nonce: nonce,
      to: validatedRecipientAddress,
      value: parseEther(amountInEther.toString()),
      data: additionalData,
      gasLimit: customGasLimit,
      gasPrice: parseUnits(customGasPrice, 'gwei')
    };
    
    const transaction = await signer.sendTransaction(txParams);
    console.log("Transaksi sedang diproses. Hash:", transaction.hash);
    
    const receipt = await transaction.wait();
    console.log("Transaksi berhasil:", {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      from: receipt.from,
      to: receipt.to,
      gasUsed: receipt.gasUsed.toString()
    });
    
    return receipt;
  } catch (error) {
    console.error("Kesalahan transaksi:", error);
    
    if (error.code === 'ACTION_REJECTED') {
      alert("Transaksi ditolak oleh pengguna");
    } else if (error.code === 'INSUFFICIENT_FUNDS') {
      alert("Saldo tidak mencukupi untuk transaksi");
    } else if (error.message.includes('nonce')) {
      console.error("Kesalahan nonce. Kemungkinan penyebab:");
      console.error("1. Transaksi tertunda di antrian");
      console.error("2. Transaksi sebelumnya belum dikonfirmasi");
    }
    
    throw error;
  }
}

// Fungsi untuk memeriksa jaringan saat ini
export async function checkCurrentNetwork() {
  const { provider } = await getEthereumProviderAndSigner();
  const network = await provider.getNetwork();
  console.log(`Terhubung ke jaringan: ${network.name} (Chain ID: ${network.chainId})`);
  return network;
}

// Fungsi untuk mendapatkan instance kontrak Produk
export async function getProductContract() {
  const { signer } = await getEthereumProviderAndSigner();
  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  const contractABI = [
    "function getProductCount() view returns (uint256)",
    "function getProduct(uint256) view returns (tuple(string name, string category, string origin, string ipfsHash))"
  ];
  return new Contract(contractAddress, contractABI, signer);
}

// Fungsi untuk mendapatkan instance kontrak AccessControl
export async function getAccessControlContract() {
  const { signer } = await getEthereumProviderAndSigner();
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = [
    "function isAdmin(address) view returns (bool)",
    "function isFarmer(address) view returns (bool)",
    "function isCustomer(address) view returns (bool)",
    "function grantRole(address, string)",
    "function revokeRole(address, string)"
  ];
  return new Contract(contractAddress, contractABI, signer);
}

// Fungsi untuk mereset nonce jika macet
export async function resetNonceIfStuck() {
  const { provider, signer } = await getEthereumProviderAndSigner();
  const fromAddress = await signer.getAddress();
  const onChainNonce = await provider.getTransactionCount(fromAddress);
  console.log("Nonce saat ini di on-chain:", onChainNonce);
  return onChainNonce;
}

// Export default untuk kemudahan penggunaan
export default {
  connectMetaMask,
  getEthereumProviderAndSigner,
  sendEthereumTransaction,
  checkCurrentNetwork,
  getProductContract,
  getAccessControlContract,
  resetNonceIfStuck
};
