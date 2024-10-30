const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const RewardToken = await ethers.getContractFactory("ERC20RewardToken");
  const rewardToken = await RewardToken.deploy();
  console.log("RewardToken deployed to:", rewardToken.address);

  const ProductNFT = await ethers.getContractFactory("ERC721ProductNFT");
  const productNFT = await ProductNFT.deploy();
  console.log("ProductNFT deployed to:", productNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
