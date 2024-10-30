require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Mengimpor dotenv jika Anda menggunakan variabel lingkungan

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337, // Chain ID jaringan lokal Hardhat
    },
    hardhat: {
      chainId: 31337 // Untuk jaringan Hardhat default
    },
    // Tambahkan jaringan lainnya jika diperlukan, seperti Rinkeby, Goerli, dll.
    // example: {
    //   url: process.env.ALCHEMY_API_URL, // Menggunakan variabel lingkungan untuk URL RPC
    //   accounts: [process.env.PRIVATE_KEY]
    // }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  gasReporter: {
    enabled: true, // Aktifkan pelaporan gas
    currency: "USD", // Konversi gas ke USD
    gasPrice: 21, // Gas price yang digunakan untuk pelaporan
    coinmarketcap: process.env.CMC_API_KEY // Kunci API dari CoinMarketCap untuk harga gas
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY // Untuk verifikasi kontrak di Etherscan
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v5"
  }
};
