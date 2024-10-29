// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IProduct.sol";
import "../security/AccessControl.sol";

contract Product is IProduct, AccessControl {
    struct ProductInfoInterface {
        uint256 id;
        string name;
        string category;
        string origin;
        string ipfsHash;
        address owner;
        bool verified;
    }

    mapping(uint256 => ProductInfo) private products;
    uint256 public productCount;


    modifier onlyExistingProduct(uint256 _id) {
        require(_id > 0 && _id <= productCount, "Product does not exist");
        _;
    }

    function addProduct(string memory _name, string memory _category, string memory _origin, string memory _ipfsHash)
        external onlyAdmin {
        productCount++;
        products[productCount] = ProductInfo(productCount, _name, _category, _origin, _ipfsHash, msg.sender, false);

        emit ProductAdded(productCount, _name, _category, _origin, _ipfsHash, msg.sender);
    }

    function verifyProduct(uint256 _id) external onlyAdmin onlyExistingProduct(_id) {
        products[_id].verified = true;
        emit ProductVerified(_id, msg.sender);
    }

    function getProduct(uint256 _id) external view onlyExistingProduct(_id) returns (ProductInfo memory) {
        return products[_id];
    }
}