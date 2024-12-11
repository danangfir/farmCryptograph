const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Mendeploy kontrak dengan akun:", deployer.address);

  try {
    // Deploy AccessControl
    const AccessControl = await ethers.getContractFactory("AccessControl");
    const accessControl = await AccessControl.deploy();
    await accessControl.waitForDeployment();
    const accessControlAddress = await accessControl.getAddress();
    console.log("AccessControl dideploy ke:", accessControlAddress);

    // Deploy ERC20RewardToken dengan nama yang sepenuhnya memenuhi syarat
    const RewardToken = await ethers.getContractFactory("contracts/tokens/ERC20RewardToken.sol:ERC20RewardToken");
    const rewardToken = await RewardToken.deploy();
    await rewardToken.waitForDeployment();
    const rewardTokenAddress = await rewardToken.getAddress();
    console.log("RewardToken dideploy ke:", rewardTokenAddress);

    // Deploy ERC721ProductNFT dengan nama yang sepenuhnya memenuhi syarat
    const ProductNFT = await ethers.getContractFactory("contracts/tokens/ERC721ProductNFT.sol:ERC721ProductNFT");
    const productNFT = await ProductNFT.deploy();
    await productNFT.waitForDeployment();
    const productNFTAddress = await productNFT.getAddress();
    console.log("ProductNFT dideploy ke:", productNFTAddress);

    // Deploy ProductTracking
    const ProductTracking = await ethers.getContractFactory("ProductTracking");
    const productTracking = await ProductTracking.deploy(rewardTokenAddress, productNFTAddress);
    await productTracking.waitForDeployment();
    const productTrackingAddress = await productTracking.getAddress();
    console.log("ProductTracking dideploy ke:", productTrackingAddress);

  } catch (error) {
    console.error("Error saat deployment:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });