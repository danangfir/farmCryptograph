require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      // Jaringan Hardhat lokal (default)
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      network_id: "*",
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
      accounts: [`0x${YOUR_PRIVATE_KEY}`],
    },
  },
};
