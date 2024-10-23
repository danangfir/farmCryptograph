// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library ProductLib {
    // Struktur data untuk menyimpan informasi produk
    struct ProductData {
        uint256 id;
        string name;
        address farmer;
        string ipfsHash;
        bool certified;
        address currentOwner;
    }

    // Fungsi untuk mengatur data produk
    function setProduct(
        ProductData storage product,
        uint256 _id,
        string memory _name,
        address _farmer,
        string memory _ipfsHash,
        address _currentOwner
    ) internal {
        product.id = _id;
        product.name = _name;
        product.farmer = _farmer;
        product.ipfsHash = _ipfsHash;
        product.certified = false; // Produk awalnya tidak tersertifikasi
        product.currentOwner = _currentOwner;
    }

    // Fungsi untuk memperbarui sertifikasi produk
    function certify(ProductData storage product, string memory _ipfsHash) internal {
        product.certified = true;
        product.ipfsHash = _ipfsHash;
    }

    // Fungsi untuk mentransfer kepemilikan produk
    function transfer(ProductData storage product, address _newOwner) internal {
        product.currentOwner = _newOwner;
    }

    // Fungsi untuk memverifikasi apakah produk tersertifikasi
    function isCertified(ProductData storage product) internal view returns (bool) {
        return product.certified;
    }
}
