// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import dari OpenZeppelin ERC721
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721ProductNFT is ERC721URIStorage, Ownable {
    uint256 public tokenIdCounter;

    constructor() ERC721("ProductNFT", "PNFT") {
        tokenIdCounter = 1; // Mulai dari 1 untuk NFT ID
    }

    // Fungsi untuk mint NFT baru
    function mintNFT(address to, string memory tokenURI) external onlyOwner returns (uint256) {
        uint256 newTokenId = tokenIdCounter;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        tokenIdCounter += 1;
        return newTokenId;
    }

    // Fungsi untuk mengupdate metadata URI
    function updateTokenURI(uint256 tokenId, string memory tokenURI) external onlyOwner {
        require(_exists(tokenId), "ERC721: URI set of nonexistent token");
        _setTokenURI(tokenId, tokenURI);
    }
}
