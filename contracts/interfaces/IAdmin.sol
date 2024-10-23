// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAdmin {
    // Fungsi untuk menambahkan admin baru
    function addAdmin(address _admin) external;

    // Fungsi untuk mendaftarkan petani baru
    function addFarmer(address _farmer) external;

    // Fungsi untuk mendaftarkan pelanggan baru
    function addCustomer(address _customer) external;
}
