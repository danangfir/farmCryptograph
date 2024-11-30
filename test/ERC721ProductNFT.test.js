const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721ProductNFT Contract", function () {
  let productNFT, owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const ProductNFT = await ethers.getContractFactory("contracts/tokens/ERC721ProductNFT.sol:ERC721ProductNFT");
    productNFT = await ProductNFT.deploy();
    await productNFT.waitForDeployment();    
  });

  it("should mint a new NFT", async function () {
    const tx = await productNFT.createProductNFT(user.address);
    const balance = await productNFT.balanceOf(user.address);
    expect(balance).to.equal(1);  // Memastikan user memiliki 1 NFT
  });

  it("should allow owner to update token URI", async function () {
    const tx = await productNFT.createProductNFT(user.address);
    const tokenId = 1; // Misalnya, jika `tokenId` dimulai dari 1

    // Panggil updateTokenURI untuk memperbarui URI
    await productNFT.connect(user).updateTokenURI(tokenId, "new-uri");
    expect(await productNFT.tokenURI(tokenId)).to.equal("new-uri");
  });
});
