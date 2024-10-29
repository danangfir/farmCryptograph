// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Impor pustaka Utils
import "../libraries/Utils.sol";

contract AccessControl {
    using Utils for *; // Menghubungkan pustaka Utils

    // Mapping untuk admin, petani, dan pelanggan
    mapping(address => bool) public admins;
    mapping(address => bool) public farmers;
    mapping(address => bool) public customers;

    // Event ketika peran ditambahkan atau dihapus
    event RoleGranted(address indexed account, string role);
    event RoleRevoked(address indexed account, string role);

    // Modifier untuk membatasi akses hanya kepada admin
    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admin can perform this action");
        _;
    }

    // Modifier untuk membatasi akses hanya kepada petani
    modifier onlyFarmer() {
        require(farmers[msg.sender], "Only farmer can perform this action");
        _;
    }

    // Modifier untuk membatasi akses hanya kepada pelanggan
    modifier onlyCustomer() {
        require(customers[msg.sender], "Only customer can perform this action");
        _;
    }

    // Constructor: Menetapkan deployer sebagai admin pertama
    constructor() {
        _grantRole(msg.sender, "admin");
    }

    // Fungsi internal untuk memberikan peran
    function _grantRole(address _account, string memory _role) internal {
        if (Utils.compareStrings(_role, "admin")) {
            admins[_account] = true;
        } else if (Utils.compareStrings(_role, "farmer")) {
            farmers[_account] = true;
        } else if (Utils.compareStrings(_role, "customer")) {
            customers[_account] = true;
        }
        emit RoleGranted(_account, _role);
    }

    // Fungsi internal untuk mencabut peran
    function _revokeRole(address _account, string memory _role) internal {
        if (Utils.compareStrings(_role, "admin")) {
            admins[_account] = false;
        } else if (Utils.compareStrings(_role, "farmer")) {
            farmers[_account] = false;
        } else if (Utils.compareStrings(_role, "customer")) {
            customers[_account] = false;
        }
        emit RoleRevoked(_account, _role);
    }

    // Fungsi untuk memberikan peran baru (hanya admin)
    function grantRole(address _account, string memory _role) public onlyAdmin {
        require(Utils.isValidAddress(_account), "Invalid address");
        _grantRole(_account, _role);
    }

    // Fungsi untuk mencabut peran (hanya admin)
    function revokeRole(address _account, string memory _role) public onlyAdmin {
        require(Utils.isValidAddress(_account), "Invalid address");
        _revokeRole(_account, _role);
    }

    // Fungsi untuk memeriksa apakah alamat adalah admin
    function isAdmin(address _account) public view returns (bool) {
        return admins[_account];
    }

    // Fungsi untuk memeriksa apakah alamat adalah petani
    function isFarmer(address _account) public view returns (bool) {
        return farmers[_account];
    }

    // Fungsi untuk memeriksa apakah alamat adalah pelanggan
    function isCustomer(address _account) public view returns (bool) {
        return customers[_account];
    }
}
