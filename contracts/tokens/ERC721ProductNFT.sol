// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721ProductNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("ProductNFT", "PNFT") {
        tokenCounter = 0;
    }

    // Fungsi untuk membuat NFT baru untuk produk
    function createProductNFT(address owner) external onlyOwner returns (uint256) {
        tokenCounter++;
        _safeMint(owner, tokenCounter);
        return tokenCounter;
    }

    // Fungsi untuk mentransfer NFT produk
    function transferProductNFT(address from, address to, uint256 tokenId) external {
        require(ownerOf(tokenId) == from, "You are not the owner of this NFT");
        _transfer(from, to, tokenId);
    }
}
