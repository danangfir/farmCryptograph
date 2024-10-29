// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/ICustomer.sol";
import "../security/AccessControl.sol";

contract Customer is ICustomer, AccessControl {

    function checkProduct(uint256 _productId, string memory _ipfsHash) external {
        // Fungsi ini dapat diperluas untuk memvalidasi hash IPFS produk dengan data yang tersimpan
        emit ProductChecked(_productId, _ipfsHash, msg.sender);
    }
}