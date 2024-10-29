// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "../interfaces/IDistribution.sol";
import "../libraries/ProductLib.sol";
import "../security/AccessControl.sol";

contract Distribution is IDistribution, AccessControl {
    // Pastikan struct ini tidak ada duplikatnya di file lain
    struct DistributionLogStruct {
        uint256 productId;
        string location;
        uint256 timestamp;
        address handler;
    }

    mapping(uint256 => DistributionLogStruct[]) public distributionLogs;

    modifier onlyExistingProduct(uint256 _productId) {
        require(_productId > 0, "Invalid product ID");
        _;
    }

    // Pastikan modifier onlyDistributor ada di kontrak AccessControl
    function recordDistribution(uint256 _productId, string memory _location) 
        external onlyExistingProduct(_productId) {
        distributionLogs[_productId].push(DistributionLogStruct(_productId, _location, block.timestamp, msg.sender));

        emit ProductDistributed(_productId, _location, block.timestamp, msg.sender);
}

    function getDistributionLog(uint256 _productId) 
        external view onlyExistingProduct(_productId) returns (IDistribution.DistributionLog[] memory) {
        IDistribution.DistributionLog[] memory logs = new IDistribution.DistributionLog[](distributionLogs[_productId].length);
        for (uint256 i = 0; i < distributionLogs[_productId].length; i++) {
            logs[i] = IDistribution.DistributionLog(distributionLogs[_productId][i].productId, distributionLogs[_productId][i].location, distributionLogs[_productId][i].timestamp, distributionLogs[_productId][i].handler);
        }
        return logs;
    }
}
