const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProductTracking", function () {
  let productTracking, rewardToken, productNFT;
  let owner, farmer, customer;

  beforeEach(async function () {
    [owner, farmer, customer] = await ethers.getSigners();

    const ERC20RewardToken = await ethers.getContractFactory("contracts/tokens/ERC20RewardToken.sol:ERC20RewardToken");
    rewardToken = await ERC20RewardToken.deploy();
    await rewardToken.waitForDeployment();

    const ERC721ProductNFT = await ethers.getContractFactory("contracts/tokens/ERC721ProductNFT.sol:ERC721ProductNFT");
    productNFT = await ERC721ProductNFT.deploy();
    await productNFT.waitForDeployment();

    const ProductTracking = await ethers.getContractFactory("contracts/ProductTracking.sol:ProductTracking");
    productTracking = await ProductTracking.deploy(await rewardToken.getAddress(), await productNFT.getAddress());
    await productTracking.waitForDeployment();

    expect(await productTracking.rewardToken()).to.equal(await rewardToken.getAddress());
    expect(await productTracking.productNFT()).to.equal(await productNFT.getAddress());
  });

  it("Should register a new product with NFT", async function () {
    await productTracking.connect(owner).registerFarmerExternal(farmer.address);

    // Hilangkan pencarian event dan cek langsung keberadaan produk
    await productTracking.connect(farmer).registerProductWithNFT(
      "Tomato", 
      "Vegetable", 
      "Farm A", 
      "ipfs://initialHash"
    );

    const productId = 1; // Misalnya, jika `productId` dimulai dari 1
    expect(await productNFT.ownerOf(productId)).to.equal(farmer.address);
    expect((await productTracking.getProductDetails(productId)).name).to.equal("Tomato");
  });
});
