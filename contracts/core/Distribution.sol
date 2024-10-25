// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/IDistribution.sol";
import "../libraries/ProductLib.sol";
import "../security/AccessControl.sol";

contract Distribution is IDistribution, AccessControl {
    struct DistributionLog {
        uint256 productId;
        string location;
        uint256 timestamp;
        address handler;
    }

    mapping(uint256 => DistributionLog[]) public distributionLogs;

    event ProductDistributed(uint256 indexed productId, string location, uint256 timestamp, address handler);

    modifier onlyExistingProduct(uint256 _productId) {
        require(_productId > 0, "Invalid product ID");
        _;
    }

    function recordDistribution(uint256 _productId, string memory _location) 
        external onlyDistributor onlyExistingProduct(_productId) {
        distributionLogs[_productId].push(
            DistributionLog(_productId, _location, block.timestamp, msg.sender)
        );

        emit ProductDistributed(_productId, _location, block.timestamp, msg.sender);
    }

    function getDistributionLog(uint256 _productId) 
        external view onlyExistingProduct(_productId) returns (DistributionLog[] memory) {
        return distributionLogs[_productId];
    }
}
