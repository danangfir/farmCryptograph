// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICustomer {
    // Fungsi untuk menambahkan feedback pada produk
    function addFeedback(uint256 _productId, string memory _feedback) external;

    // Fungsi untuk mendapatkan feedback produk
    function getFeedback(uint256 _productId) external view returns (string[] memory);

    // Fungsi untuk melacak produk
    function trackProduct(uint256 _productId) external view returns (ProductLib.ProductData memory);
}
