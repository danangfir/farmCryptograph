require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const { INFURA_PROJECT_ID, YOUR_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20"
      },
      // Jika butuh versi lain, tambahkan di sini
      {
        version: "0.8.0"
      }
    ]
  },
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${YOUR_PRIVATE_KEY}`],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${YOUR_PRIVATE_KEY}`],
    },
  },
};
