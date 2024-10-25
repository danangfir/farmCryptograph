// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IProduct {
    // Struktur data untuk produk
    struct ProductInfo {
        uint256 id;
        string name;
        string category;
        string origin;
        string ipfsHash;
        address owner;
        bool verified;
    }

    // Event untuk produk yang baru ditambahkan
    event ProductAdded(uint256 indexed id, string name, string category, string origin, string ipfsHash, address indexed owner);

    // Event untuk produk yang diverifikasi
    event ProductVerified(uint256 indexed id, address verifiedBy);

    // Fungsi untuk menambah produk baru
    function addProduct(string memory _name, string memory _category, string memory _origin, string memory _ipfsHash) external;

    // Fungsi untuk verifikasi produk
    function verifyProduct(uint256 _id) external;

    // Fungsi untuk mendapatkan informasi produk
    function getProduct(uint256 _id) external view returns (ProductInfo memory);
}
