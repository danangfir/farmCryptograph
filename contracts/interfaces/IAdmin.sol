// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAdmin {
    // Event untuk kategori baru yang ditambahkan
    event CategoryAdded(string category);

    // Fungsi untuk menambah kategori baru
    function addCategory(string memory _category) external;

    // Fungsi untuk mendapatkan daftar kategori yang tersedia
    function getCategories() external view returns (string[] memory);
}
