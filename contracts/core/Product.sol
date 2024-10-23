// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../security/AccessControl.sol";
import "../libraries/ProductLib.sol";
import "../interfaces/IProduct.sol";

contract Product is IProduct, AccessControl {
    using ProductLib for ProductLib.ProductData;

    // Mapping untuk menyimpan produk
    mapping(uint256 => ProductLib.ProductData) public products;
    uint256 public productCounter;

    event ProductAdded(uint256 indexed productId, string name, address indexed farmer);
    event ProductCertified(uint256 indexed productId, string ipfsHash);
    event ProductTransferred(uint256 indexed productId, address indexed from, address indexed to);

    // Fungsi untuk menambahkan produk baru
    function addProduct(string memory _name, string memory _ipfsHash) public onlyFarmer {
        productCounter++;
        products[productCounter] = ProductLib.ProductData(
            productCounter,
            _name,
            msg.sender,
            _ipfsHash,
            false,
            msg.sender
        );
        emit ProductAdded(productCounter, _name, msg.sender);
    }

    // Fungsi untuk mensahkan (sertifikasi) produk
    function certifyProduct(uint256 _productId, string memory _ipfsHash) public onlyAdmin {
        require(products[_productId].id != 0, "Product does not exist");
        products[_productId].certified = true;
        products[_productId].ipfsHash = _ipfsHash;

        emit ProductCertified(_productId, _ipfsHash);
    }

    // Fungsi untuk mentransfer produk ke pemilik baru
    function transferProduct(uint256 _productId, address _newOwner) public {
        require(products[_productId].currentOwner == msg.sender, "Not the owner");
        require(users[_newOwner].isCustomer || users[_newOwner].isFarmer, "Invalid new owner");

        products[_productId].currentOwner = _newOwner;

        emit ProductTransferred(_productId, msg.sender, _newOwner);
    }

    // Fungsi untuk mendapatkan informasi produk
    function getProduct(uint256 _productId) public view returns (ProductLib.ProductData memory) {
        require(products[_productId].id != 0, "Product does not exist");
        return products[_productId];
    }
}
