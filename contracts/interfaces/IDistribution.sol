// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDistribution {
    // Struktur data untuk log distribusi
    struct DistributionLog {
        uint256 productId;
        string location;
        uint256 timestamp;
        address handler;
    }

    // Event untuk distribusi produk
    event ProductDistributed(uint256 indexed productId, string location, uint256 timestamp, address handler);

    // Fungsi untuk mencatat distribusi produk
    function recordDistribution(uint256 _productId, string memory _location) external;

    // Fungsi untuk mendapatkan log distribusi produk
    function getDistributionLog(uint256 _productId) external view returns (DistributionLog[] memory);
}
