// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC721ProductNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("ProductNFT", "PNFT") {}

    function createProductNFT(address to) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(to, newTokenId);
        return newTokenId;
    }

    function createProductNFT(address to, string memory tokenURI) public returns (uint256) {
        uint256 tokenId = createProductNFT(to);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }

    // Tambahkan fungsi updateTokenURI
    function updateTokenURI(uint256 tokenId, string memory newURI) public {
        // Hanya pemilik atau pihak yang disetujui yang bisa memperbarui URI
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        _setTokenURI(tokenId, newURI);
    }
}
