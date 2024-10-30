// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IAdmin.sol";
import "../security/AccessControl.sol";

contract Admin is IAdmin, AccessControl {
    string[] public categories;
    mapping(string => bool) public categoryExists;

    modifier onlyNewCategory(string memory _category) {
        require(!categoryExists[_category], "Category already exists");
        _;
    }

    function addCategory(string memory _category) external onlyAdmin onlyNewCategory(_category) {
        categories.push(_category);
        categoryExists[_category] = true;
        emit CategoryAdded(_category);
    }

    function getCategories() external view returns (string[] memory) {
        return categories;
    }
}
