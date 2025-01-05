// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";


/**
 * @title BioNFT
 * @dev Main NFT contract for biological data tokenization
 */
contract BioNFT is ERC721, ERC721URIStorage, ERC721Enumerable, AccessControl, IERC2981 {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 private _nextTokenId;
    
    // Mapping for bio-specific metadata
    mapping(uint256 => BioMetadata) public bioData;
    
    struct BioMetadata {
        string dataType; // e.g., "genome", "research", "patent"
        string ipfsHash; // Reference to detailed data
        uint256 timestamp;
        address creator;
    }
    
    // Royalty information
    mapping(uint256 => uint96) private _tokenRoyalties;
    
    constructor() ERC721("BioNFT", "BNFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }
    
    function mint(
        address to,
        string memory uri,
        string memory dataType,
        string memory ipfsHash,
        uint96 royaltyPercentage
    ) public onlyRole(MINTER_ROLE) returns (uint256) {
        require(royaltyPercentage <= 10000, "Royalty too high"); // Max 100%
        
        uint256 tokenId = _nextTokenId++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        bioData[tokenId] = BioMetadata({
            dataType: dataType,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp,
            creator: to
        });
        
        _tokenRoyalties[tokenId] = royaltyPercentage;
        
        return tokenId;
    }
    
    function exists(uint256 tokenId) public view virtual returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
    
    function royaltyInfo(uint256 tokenId, uint256 salePrice) public view virtual override
        returns (address receiver, uint256 royaltyAmount) {
        require(exists(tokenId), "Token does not exist");
        uint256 royalty = (salePrice * _tokenRoyalties[tokenId]) / 10000;
        return (bioData[tokenId].creator, royalty);
    }
    
    // Required overrides
    function _update(address to, uint256 tokenId, address auth) internal virtual override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }
    
    function _increaseBalance(address account, uint128 value) internal virtual override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }
    
    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        virtual 
        override(ERC721, ERC721Enumerable, ERC721URIStorage, AccessControl, IERC165) 
        returns (bool) 
    {
        return super.supportsInterface(interfaceId);
    }
}

/**
 * @title BioNFTMarketplace
 * @dev Marketplace contract for trading BioNFTs
 */
contract BioNFTMarketplace is ReentrancyGuard {
    uint256 private _nextListingId;
    
    struct Listing {
        uint256 tokenId;
        address seller;
        uint256 price;
        bool active;
    }
    
    mapping(uint256 => Listing) public listings;
    BioNFT public nftContract;
    
    event Listed(uint256 indexed listingId, uint256 indexed tokenId, address seller, uint256 price);
    event Sold(uint256 indexed listingId, uint256 indexed tokenId, address seller, address buyer, uint256 price);
    event ListingCanceled(uint256 indexed listingId);
    
    constructor(address _nftContract) {
        nftContract = BioNFT(_nftContract);
    }
    
    function createListing(uint256 tokenId, uint256 price) external nonReentrant {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not token owner");
        require(nftContract.getApproved(tokenId) == address(this), "Marketplace not approved");
        
        uint256 listingId = _nextListingId++;
        
        listings[listingId] = Listing({
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            active: true
        });
        
        emit Listed(listingId, tokenId, msg.sender, price);
    }
    
    function purchaseListing(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");
        
        // Handle royalties
        (address royaltyReceiver, uint256 royaltyAmount) = nftContract.royaltyInfo(listing.tokenId, msg.value);
        
        // Transfer NFT
        nftContract.transferFrom(listing.seller, msg.sender, listing.tokenId);
        
        // Transfer payments
        if (royaltyAmount > 0) {
            payable(royaltyReceiver).transfer(royaltyAmount);
        }
        payable(listing.seller).transfer(msg.value - royaltyAmount);
        
        listing.active = false;
        
        emit Sold(listingId, listing.tokenId, listing.seller, msg.sender, msg.value);
    }
}

/**
 * @title BioNFTStaking
 * @dev Staking contract for BioNFTs
 */
contract BioNFTStaking is ReentrancyGuard {
    struct Stake {
        uint256 tokenId;
        uint256 timestamp;
        address owner;
    }
    
    BioNFT public nftContract;
    mapping(uint256 => Stake) public stakes;
    
    // Reward rate in tokens per day (scaled by 1e18)
    uint256 public rewardRate = 10 * 1e18;
    
    event Staked(address indexed owner, uint256 indexed tokenId, uint256 timestamp);
    event Unstaked(address indexed owner, uint256 indexed tokenId, uint256 timestamp);
    event RewardClaimed(address indexed owner, uint256 amount);
    
    constructor(address _nftContract) {
        nftContract = BioNFT(_nftContract);
    }
    
    function stake(uint256 tokenId) external nonReentrant {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not token owner");
        require(stakes[tokenId].timestamp == 0, "Already staked");
        
        nftContract.transferFrom(msg.sender, address(this), tokenId);
        
        stakes[tokenId] = Stake({
            tokenId: tokenId,
            timestamp: block.timestamp,
            owner: msg.sender
        });
        
        emit Staked(msg.sender, tokenId, block.timestamp);
    }
    
    function unstake(uint256 tokenId) external nonReentrant {
        Stake storage stakeInfo = stakes[tokenId];
        require(stakeInfo.owner == msg.sender, "Not stake owner");
        
        uint256 reward = calculateReward(tokenId);
        delete stakes[tokenId];
        
        nftContract.transferFrom(address(this), msg.sender, tokenId);
        if (reward > 0) {
            // Implementation for reward token transfer would go here
            emit RewardClaimed(msg.sender, reward);
        }
        
        emit Unstaked(msg.sender, tokenId, block.timestamp);
    }
    
    function calculateReward(uint256 tokenId) public view returns (uint256) {
        Stake storage stakeInfo = stakes[tokenId];
        if (stakeInfo.timestamp == 0) return 0;
        
        uint256 stakingDuration = block.timestamp - stakeInfo.timestamp;
        return (stakingDuration * rewardRate) / 1 days;
    }
}

/**
 * @title BioNFTAccess
 * @dev Access control contract for BioNFTs
 */
contract BioNFTAccess is AccessControl {
    BioNFT public nftContract;
    
    // Mapping from token ID to approved data consumers
    mapping(uint256 => mapping(address => bool)) private _dataAccess;
    
    event AccessGranted(uint256 indexed tokenId, address indexed consumer);
    event AccessRevoked(uint256 indexed tokenId, address indexed consumer);
    
    constructor(address _nftContract) {
        nftContract = BioNFT(_nftContract);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    
    function grantAccess(uint256 tokenId, address consumer) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not token owner");
        _dataAccess[tokenId][consumer] = true;
        emit AccessGranted(tokenId, consumer);
    }
    
    function revokeAccess(uint256 tokenId, address consumer) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not token owner");
        _dataAccess[tokenId][consumer] = false;
        emit AccessRevoked(tokenId, consumer);
    }
    
    function hasAccess(uint256 tokenId, address consumer) public view returns (bool) {
        return nftContract.ownerOf(tokenId) == consumer || _dataAccess[tokenId][consumer];
    }
    
    function verifyAccess(uint256 tokenId, address consumer, bytes memory zkProof) 
        external 
        view 
        returns (bool) 
    {
        return hasAccess(tokenId, consumer);
    }
}