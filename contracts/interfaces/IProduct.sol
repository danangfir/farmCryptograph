// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../libraries/ProductLib.sol";

interface IProduct {
    // Fungsi untuk menambahkan produk baru
    function addProduct(string memory _name, string memory _ipfsHash) external;

    // Fungsi untuk mensahkan (sertifikasi) produk
    function certifyProduct(uint256 _productId, string memory _ipfsHash) external;

    // Fungsi untuk mentransfer kepemilikan produk
    function transferProduct(uint256 _productId, address _newOwner) external;

    // Fungsi untuk mendapatkan informasi produk
    function getProduct(uint256 _productId) external view returns (ProductLib.ProductData memory);
}
