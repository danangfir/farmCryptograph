const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProductTracking", function () {
  let rewardToken, productNFT, productTracking;
  let owner, farmer, customer;
  const initialSupply = 1000000;

  beforeEach(async function () {
    // Dapatkan akun untuk testing
    [owner, farmer, customer] = await ethers.getSigners();

    // Deploy ERC20RewardToken
    const ERC20RewardToken = await ethers.getContractFactory("ERC20RewardToken");
    rewardToken = await ERC20RewardToken.deploy(initialSupply);
    await rewardToken.deployed();

    // Deploy ERC721ProductNFT
    const ERC721ProductNFT = await ethers.getContractFactory("ERC721ProductNFT");
    productNFT = await ERC721ProductNFT.deploy();
    await productNFT.deployed();

    // Deploy ProductTracking
    const ProductTracking = await ethers.getContractFactory("ProductTracking");
    productTracking = await ProductTracking.deploy(rewardToken.address, productNFT.address);
    await productTracking.deployed();
  });

  it("Should register a new product with NFT", async function () {
    // Farmer mendaftarkan produk baru
    await productTracking.connect(farmer).registerProductWithNFT("Product1", "ipfsHash1");

    // Verifikasi produk telah terdaftar
    const product = await productTracking.getProduct(1);
    expect(product.name).to.equal("Product1");
    expect(product.ipfsHash).to.equal("ipfsHash1");
    expect(product.currentOwner).to.equal(farmer.address);
  });

  it("Should certify product and issue reward", async function () {
    // Farmer mendaftarkan produk
    await productTracking.connect(farmer).registerProductWithNFT("Product1", "ipfsHash1");

    // Admin mensahkan produk dan memberikan reward
    await productTracking.connect(owner).certifyProductAndReward(1, "ipfsHashCertified", 100);

    // Verifikasi produk tersertifikasi dan reward diterima
    const product = await productTracking.getProduct(1);
    expect(product.certified).to.be.true;
    expect(product.ipfsHash).to.equal("ipfsHashCertified");

    const farmerBalance = await rewardToken.balanceOf(farmer.address);
    expect(farmerBalance).to.equal(100);
  });

  it("Should transfer product with NFT", async function () {
    // Farmer mendaftarkan produk
    await productTracking.connect(farmer).registerProductWithNFT("Product1", "ipfsHash1");

    // Transfer produk dan NFT ke pelanggan
    await productTracking.connect(farmer).transferProductWithNFT(1, customer.address);

    // Verifikasi transfer produk dan NFT
    const product = await productTracking.getProduct(1);
    expect(product.currentOwner).to.equal(customer.address);

    const tokenOwner = await productNFT.ownerOf(1);
    expect(tokenOwner).to.equal(customer.address);
  });
});
