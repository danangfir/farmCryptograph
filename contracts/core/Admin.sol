// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../security/AccessControl.sol";
import "../interfaces/IAdmin.sol";

contract Admin is IAdmin, AccessControl {
    event AdminAdded(address indexed newAdmin);
    event FarmerAdded(address indexed newFarmer);
    event CustomerAdded(address indexed newCustomer);

    // Fungsi untuk menambahkan admin baru
    function addAdmin(address _admin) public onlyAdmin {
        require(_admin != address(0), "Invalid address");
        admins[_admin] = true;
        users[_admin].isAdmin = true;

        emit AdminAdded(_admin);
    }

    // Fungsi untuk mendaftarkan petani baru
    function addFarmer(address _farmer) public onlyAdmin {
        require(_farmer != address(0), "Invalid address");
        farmers[_farmer] = true;
        users[_farmer].isFarmer = true;

        emit FarmerAdded(_farmer);
    }

    // Fungsi untuk mendaftarkan pelanggan baru
    function addCustomer(address _customer) public onlyAdmin {
        require(_customer != address(0), "Invalid address");
        users[_customer].isCustomer = true;

        emit CustomerAdded(_customer);
    }
}
