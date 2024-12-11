// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Product.sol
contract Product {
    struct ProductInfo {
        string name;
        string category;
        string origin;
        string ipfsHash;
        address farmer;
        bool isCertified;
        address currentOwner;
    }

    uint256 public productCount;
    mapping(uint256 => ProductInfo) public products;
    mapping(address => bool) public registeredFarmers;

    event FarmerRegistered(address indexed farmer);

    modifier onlyFarmer() {
        require(registeredFarmers[msg.sender], "Not a registered farmer");
        _;
    }

    function registerFarmer(address _farmer) internal {
        registeredFarmers[_farmer] = true;
        emit FarmerRegistered(_farmer);
    }

    function addProduct(
        string memory _name,
        string memory _category,
        string memory _origin,
        string memory _ipfsHash
    ) internal onlyFarmer {
        productCount++;
        products[productCount] = ProductInfo({
            name: _name,
            category: _category,
            origin: _origin,
            ipfsHash: _ipfsHash,
            farmer: msg.sender,
            isCertified: false,
            currentOwner: msg.sender
        });
    }

    function certifyProduct(uint256 _productId, string memory _ipfsHash) internal {
        require(_productId <= productCount, "Invalid product ID");
        require(!products[_productId].isCertified, "Already certified");
        products[_productId].isCertified = true;
        products[_productId].ipfsHash = _ipfsHash;
    }

    function transferProduct(uint256 _productId, address _newOwner) internal {
        require(_productId <= productCount, "Invalid product ID");
        require(products[_productId].currentOwner == msg.sender, "Not the owner");
        products[_productId].currentOwner = _newOwner;
    }
}

// Admin.sol
contract Admin {
    address public owner;
    mapping(address => bool) public admins;

    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);

    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Not an admin");
        _;
    }

    function addAdmin(address _admin) external onlyOwner {
        admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    function removeAdmin(address _admin) external onlyOwner {
        require(_admin != owner, "Cannot remove owner");
        admins[_admin] = false;
        emit AdminRemoved(_admin);
    }
}

// Customer.sol
contract Customer {
    struct CustomerInfo {
        bool isRegistered;
        uint256[] purchasedProducts;
    }

    mapping(address => CustomerInfo) public customers;

    event CustomerRegistered(address indexed customer);

    function registerCustomer() external {
        require(!customers[msg.sender].isRegistered, "Already registered");
        customers[msg.sender].isRegistered = true;
        emit CustomerRegistered(msg.sender);
    }

    function addPurchasedProduct(address _customer, uint256 _productId) internal {
        require(customers[_customer].isRegistered, "Customer not registered");
        customers[_customer].purchasedProducts.push(_productId);
    }
}

// ERC20RewardToken.sol
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20RewardToken is ERC20, Ownable {
    constructor() ERC20("Farming Reward Token", "FRT") {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

// ERC721ProductNFT.sol
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721ProductNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Product NFT", "PNFT") {}

    function createProductNFT(address recipient) external onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(recipient, newTokenId);
        return newTokenId;
    }

    function transferProductNFT(address from, address to, uint256 tokenId) external {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved or owner");
        _transfer(from, to, tokenId);
    }
}

// ProductTracking.sol (Main Contract)
contract ProductTracking is Product, Admin, Customer {
    ERC20RewardToken public rewardToken;
    ERC721ProductNFT public productNFT;

    event ProductRegistered(uint256 indexed productId, string name, address indexed farmer);
    event ProductCertified(uint256 indexed productId, string ipfsHash);
    event RewardIssued(address indexed recipient, uint256 amount);
    event NFTCreated(uint256 indexed productId, address indexed owner, uint256 tokenId);

    constructor(
        address _rewardTokenAddress,
        address _productNFTAddress
    ) {
        rewardToken = ERC20RewardToken(_rewardTokenAddress);
        productNFT = ERC721ProductNFT(_productNFTAddress);
    }

    function registerFarmerExternal(address _farmer) external onlyAdmin {
        registerFarmer(_farmer);
    }

    function registerProductWithNFT(
        string memory _name,
        string memory _category,
        string memory _origin,
        string memory _ipfsHash
    ) external onlyFarmer {
        addProduct(_name, _category, _origin, _ipfsHash);
        
        uint256 productId = productCount;
        uint256 tokenId = productNFT.createProductNFT(msg.sender);
        
        emit NFTCreated(productId, msg.sender, tokenId);
        emit ProductRegistered(productId, _name, msg.sender);
    }

    function certifyProductAndReward(
        uint256 _productId,
        string memory _ipfsHash,
        uint256 rewardAmount
    ) external onlyAdmin {
        certifyProduct(_productId, _ipfsHash);
        address farmer = products[_productId].farmer;
        rewardToken.mint(farmer, rewardAmount);
        
        emit RewardIssued(farmer, rewardAmount);
        emit ProductCertified(_productId, _ipfsHash);
    }

    function transferProductWithNFT(uint256 _productId, address _newOwner) external {
        require(_productId <= productCount, "Invalid product ID");
        require(products[_productId].currentOwner == msg.sender, "Not the owner");
        
        transferProduct(_productId, _newOwner);
        uint256 tokenId = _productId;
        productNFT.transferProductNFT(msg.sender, _newOwner, tokenId);
        
        if(customers[_newOwner].isRegistered) {
            addPurchasedProduct(_newOwner, _productId);
        }
    }

    function getProductDetails(uint256 _productId) external view returns (
        string memory name,
        string memory category,
        string memory origin,
        string memory ipfsHash,
        address farmer,
        bool isCertified,
        address currentOwner
    ) {
        require(_productId <= productCount, "Invalid product ID");
        ProductInfo memory product = products[_productId];
        return (
            product.name,
            product.category,
            product.origin,
            product.ipfsHash,
            product.farmer,
            product.isCertified,
            product.currentOwner
        );
    }
}