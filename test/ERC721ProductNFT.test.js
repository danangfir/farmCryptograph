const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC721ProductNFT Contract", function () {
  let ProductNFT;
  let productNFT;
  let owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy kontrak ERC721ProductNFT.sol
    ProductNFT = await ethers.getContractFactory("ERC721ProductNFT");
    productNFT = await ProductNFT.deploy();
    await productNFT.deployed();
  });

  it("should mint a new NFT", async function () {
    const tokenId = await productNFT.mintNFT(user.address, "ipfs://QmHashForProduct");
    expect(await productNFT.ownerOf(1)).to.equal(user.address);
  });

  it("should allow owner to update token URI", async function () {
    await productNFT.mintNFT(user.address, "ipfs://QmHashForProduct");
    await productNFT.updateTokenURI(1, "ipfs://NewHashForProduct");

    const newTokenURI = await productNFT.tokenURI(1);
    expect(newTokenURI).to.equal("ipfs://NewHashForProduct");
  });
});
