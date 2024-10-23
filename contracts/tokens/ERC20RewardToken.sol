// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20RewardToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("RewardToken", "RWT") {
        // Mint token awal kepada deployer
        _mint(msg.sender, initialSupply);
    }

    // Fungsi untuk minting token baru oleh owner (admin)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Fungsi untuk burning token
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
