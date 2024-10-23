// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./core/Product.sol";
import "./core/Admin.sol";
import "./core/Customer.sol";
import "./tokens/ERC20RewardToken.sol";
import "./tokens/ERC721ProductNFT.sol";

contract ProductTracking is Product, Admin, Customer {
    ERC20RewardToken public rewardToken;
    ERC721ProductNFT public productNFT;

    event ProductRegistered(uint256 indexed productId, string name, address indexed farmer);
    event ProductCertified(uint256 indexed productId, string ipfsHash);
    event RewardIssued(address indexed recipient, uint256 amount);
    event NFTCreated(uint256 indexed productId, address indexed owner);

    constructor(
        address _rewardTokenAddress,
        address _productNFTAddress
    ) {
        rewardToken = ERC20RewardToken(_rewardTokenAddress);
        productNFT = ERC721ProductNFT(_productNFTAddress);
    }

    // Fungsi untuk mendaftarkan produk baru dan menciptakan NFT
    function registerProductWithNFT(string memory _name, string memory _ipfsHash) external onlyFarmer {
        addProduct(_name, _ipfsHash);
        uint256 productId = productCounter;

        // Mint NFT untuk produk baru
        uint256 tokenId = productNFT.createProductNFT(msg.sender);
        emit NFTCreated(productId, msg.sender);

        emit ProductRegistered(productId, _name, msg.sender);
    }

    // Fungsi untuk mensahkan produk dan memberikan reward kepada petani
    function certifyProductAndReward(uint256 _productId, string memory _ipfsHash, uint256 rewardAmount) external onlyAdmin {
        certifyProduct(_productId, _ipfsHash);

        // Berikan reward kepada petani
        address farmer = products[_productId].farmer;
        rewardToken.mint(farmer, rewardAmount);
        emit RewardIssued(farmer, rewardAmount);

        emit ProductCertified(_productId, _ipfsHash);
    }

    // Fungsi untuk mentransfer produk dan NFT terkait
    function transferProductWithNFT(uint256 _productId, address _newOwner) external {
        // Transfer kepemilikan produk
        transferProduct(_productId, _newOwner);

        // Transfer NFT produk terkait
        uint256 tokenId = _productId; // Asumsikan tokenId = productId
        productNFT.transferProductNFT(msg.sender, _newOwner, tokenId);
    }
}
