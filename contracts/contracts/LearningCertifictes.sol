// contracts/LearningCertificate.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract LearningCertificate is ERC721URIStorage, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public tokenCounter;

    event CertificateMinted(address indexed recipient, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("LearningCertificate", "LCERT") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        tokenCounter = 1;
    }

    function createCertificate(address recipient, string memory tokenURI_) public onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI_);
        emit CertificateMinted(recipient, newTokenId, tokenURI_);
        tokenCounter += 1;
        return newTokenId;
    }

    function _burn(uint256 tokenId) internal override(ERC721URIStorage, ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721URIStorage, ERC721) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
