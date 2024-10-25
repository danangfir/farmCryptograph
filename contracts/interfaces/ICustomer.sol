// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICustomer {
    // Event untuk produk yang diverifikasi oleh customer
    event ProductChecked(uint256 indexed productId, string ipfsHash, address checkedBy);

    // Fungsi untuk memverifikasi produk
    function checkProduct(uint256 _productId, string memory _ipfsHash) external;
}
