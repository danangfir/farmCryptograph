const hre = require("hardhat");

async function main() {
  // Dapatkan kontrak dari folder contracts/
  const ProductTracking = await hre.ethers.getContractFactory("ProductTracking");
  
  // Deploy kontrak
  const productTracking = await ProductTracking.deploy();
  await productTracking.deployed();

  console.log("ProductTracking deployed to:", productTracking.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
