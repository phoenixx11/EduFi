// contracts/EducatorCertificate.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract EducatorCertificate is ERC721URIStorage, AccessControl {
    bytes32 public constant EDUCATOR_ROLE = keccak256("EDUCATOR_ROLE");
    uint256 public tokenCounter;

    struct Video {
        uint256 id;
        string uri;
        uint256 timestamp;
    }

    struct Option {
        uint256 tokenId;
        uint256 videoId;
        uint256 strikePrice; // Example condition
        uint256 expiration;
        bool isExercised;
    }

    // Mapping from video ID to Video details
    mapping(uint256 => Video) public videos;

    // Mapping from token ID to Option details
    mapping(uint256 => Option) public options;

    event VideoUploaded(uint256 indexed videoId, string uri, uint256 timestamp);
    event OptionMinted(address indexed to, uint256 indexed tokenId, uint256 videoId, uint256 strikePrice, uint256 expiration);

    constructor() ERC721("EducatorCertificate", "EDUCERT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(EDUCATOR_ROLE, msg.sender);
        tokenCounter = 1;
    }

    /**
     * @notice Uploads a video by an educator.
     * @param uri The metadata URI of the video (e.g., IPFS link).
     */
    function uploadVideo(string memory uri) external onlyRole(EDUCATOR_ROLE) {
        uint256 videoId = tokenCounter;
        videos[videoId] = Video(videoId, uri, block.timestamp);
        emit VideoUploaded(videoId, uri, block.timestamp);
        tokenCounter += 1;
    }

    /**
     * @notice Mints an option NFT for a specific video.
     * @param to The address to mint the NFT to.
     * @param videoId The ID of the video the option is linked to.
     * @param strikePrice The condition to exercise the option.
     * @param expiration The timestamp when the option expires.
     * @param uri The metadata URI of the option NFT.
     */
    function mintOptionNFT(
        address to,
        uint256 videoId,
        uint256 strikePrice,
        uint256 expiration,
        string memory uri
    ) external onlyRole(EDUCATOR_ROLE) {
        require(videos[videoId].id != 0, "Video does not exist");
        require(expiration > block.timestamp, "Expiration must be in the future");

        uint256 tokenId = tokenCounter;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        options[tokenId] = Option(tokenId, videoId, strikePrice, expiration, false);

        emit OptionMinted(to, tokenId, videoId, strikePrice, expiration);
        tokenCounter += 1;
    }

    /**
     * @notice Allows the holder to exercise their option.
     * @param tokenId The ID of the option NFT to exercise.
     */
    function exerciseOption(uint256 tokenId) external payable {
        Option storage option = options[tokenId];
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(block.timestamp <= option.expiration, "Option expired");
        require(!option.isExercised, "Option already exercised");
        require(msg.value >= option.strikePrice, "Insufficient value to exercise");

        option.isExercised = true;

        // Implement the logic upon exercising the option, e.g., granting access to the video
        // This could involve setting access permissions, transferring tokens, etc.
    }

    /**
     * @notice Assigns the Educator role to an address.
     * @param account The address to assign the Educator role to.
     */
    function addEducator(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(EDUCATOR_ROLE, account);
    }

    /**
     * @notice Revokes the Educator role from an address.
     * @param account The address to revoke the Educator role from.
     */
    function removeEducator(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(EDUCATOR_ROLE, account);
    }
}
