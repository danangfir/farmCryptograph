// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import dari OpenZeppelin ERC20
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20RewardToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * (10 ** 18);

    // Konstruktor menerima nama dan simbol token sebagai argumen
    constructor() ERC20("RewardToken", "RWT") {
        // Mint initial supply kepada owner (deploy account)
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // Fungsi untuk mint token tambahan
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Fungsi untuk transfer token reward kepada pengguna
    function rewardUser(address to, uint256 amount) external onlyOwner {
        require(balanceOf(owner()) >= amount, "Insufficient token balance");
        _transfer(owner(), to, amount);
    }
}
