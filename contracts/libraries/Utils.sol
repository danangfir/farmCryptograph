// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Utils {
    // Fungsi untuk memverifikasi apakah sebuah alamat valid
    function isValidAddress(address _addr) internal pure returns (bool) {
        return _addr != address(0);
    }

    // Fungsi untuk membandingkan dua string
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    // Fungsi untuk menggabungkan dua string
    function concatStrings(string memory a, string memory b) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }
}
