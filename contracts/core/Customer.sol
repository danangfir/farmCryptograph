// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/ICustomer.sol";
import "../core/Product.sol";

contract Customer is ICustomer {
    Product productContract;

    // Mapping untuk menyimpan feedback dari pelanggan
    mapping(uint256 => string[]) public productFeedback;

    // Menghubungkan kontrak produk
    constructor(address _productAddress) {
        productContract = Product(_productAddress);
    }

    event FeedbackAdded(uint256 indexed productId, address indexed customer, string feedback);

    // Fungsi untuk memberikan feedback pada produk
    function addFeedback(uint256 _productId, string memory _feedback) public {
        require(productContract.getProduct(_productId).currentOwner == msg.sender, "Not the product owner");

        productFeedback[_productId].push(_feedback);
        emit FeedbackAdded(_productId, msg.sender, _feedback);
    }

    // Fungsi untuk mendapatkan feedback produk
    function getFeedback(uint256 _productId) public view returns (string[] memory) {
        return productFeedback[_productId];
    }

    // Fungsi untuk melacak produk
    function trackProduct(uint256 _productId) public view returns (ProductLib.ProductData memory) {
        return productContract.getProduct(_productId);
    }
}
