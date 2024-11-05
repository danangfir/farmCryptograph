const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20RewardToken Contract", function () {
  let rewardToken, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    const RewardToken = await ethers.getContractFactory("contracts/tokens/ERC20RewardToken.sol:ERC20RewardToken");
    rewardToken = await RewardToken.deploy();
    await rewardToken.waitForDeployment();    
  });

  it("should have initial supply assigned to owner", async function () {
    const balance = await rewardToken.balanceOf(owner.address);
    expect(balance).to.equal(await rewardToken.totalSupply());
  });

  it("should allow owner to mint new tokens", async function () {
    const amount = ethers.parseUnits("1000", 18);  // Ganti ke parseUnits versi ethers@6.x
    await rewardToken.mint(owner.address, amount);
    const balance = await rewardToken.balanceOf(owner.address);
    expect(balance).to.equal(await rewardToken.totalSupply());
  });
});
