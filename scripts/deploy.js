const hre = require("hardhat");

async function main() {
  // Deploy ERC20RewardToken
  const ERC20RewardToken = await hre.ethers.getContractFactory("ERC20RewardToken");
  const rewardToken = await ERC20RewardToken.deploy(1000000); // Supply awal 1 juta token
  await rewardToken.deployed();
  console.log("ERC20RewardToken deployed to:", rewardToken.address);

  // Deploy ERC721ProductNFT
  const ERC721ProductNFT = await hre.ethers.getContractFactory("ERC721ProductNFT");
  const productNFT = await ERC721ProductNFT.deploy();
  await productNFT.deployed();
  console.log("ERC721ProductNFT deployed to:", productNFT.address);

  // Deploy ProductTracking
  const ProductTracking = await hre.ethers.getContractFactory("ProductTracking");
  const productTracking = await ProductTracking.deploy(rewardToken.address, productNFT.address);
  await productTracking.deployed();
  console.log("ProductTracking deployed to:", productTracking.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});