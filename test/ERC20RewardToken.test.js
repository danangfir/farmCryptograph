const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20RewardToken Contract", function () {
  let RewardToken;
  let rewardToken;
  let owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy kontrak ERC20RewardToken.sol
    RewardToken = await ethers.getContractFactory("ERC20RewardToken");
    rewardToken = await RewardToken.deploy();
    await rewardToken.deployed();
  });

  it("should have initial supply assigned to owner", async function () {
    const ownerBalance = await rewardToken.balanceOf(owner.address);
    expect(ownerBalance).to.equal(await rewardToken.totalSupply());
  });

  it("should allow owner to mint new tokens", async function () {
    await rewardToken.mint(user.address, 1000);
    const userBalance = await rewardToken.balanceOf(user.address);
    expect(userBalance).to.equal(1000);
  });

  it("should allow owner to reward users", async function () {
    await rewardToken.rewardUser(user.address, 500);
    const userBalance = await rewardToken.balanceOf(user.address);
    expect(userBalance).to.equal(500);
  });
});
