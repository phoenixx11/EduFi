// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract ProofOfLearningNFT is ERC721, Ownable {
    struct Video {
        string url;
        uint256 length; // in seconds
        bool uploaded;
    }
    
    struct Option {
        address seller;
        uint256 nftId;
        uint256 strikePrice; // in wei
        uint256 expiration; // timestamp of expiration
        bool isCallOption; // true = call, false = put
    }
    
    uint256 private _tokenIdCounter;
    mapping(uint256 => Video) public videos; // tokenId -> Video details
    mapping(uint256 => Option) public options; // optionId -> Option details
    uint256 private _optionIdCounter;

    event VideoUploaded(uint256 tokenId, string url, uint256 length);
    event OptionCreated(uint256 optionId, uint256 nftId, uint256 strikePrice, uint256 expiration, bool isCallOption);
    event OptionExercised(uint256 optionId, address buyer);

    constructor() ERC721("Proof of Time", "POT") {}

    function uploadAndMintNFT(string memory videoUrl, uint256 videoLength) external {
        require(videoLength >= 120, "Video must be at least 2 minutes long");

        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;

        videos[newTokenId] = Video(videoUrl, videoLength, true);
        _mint(msg.sender, newTokenId);

        emit VideoUploaded(newTokenId, videoUrl, videoLength);
    }

    function createOption(uint256 nftId, uint256 strikePrice, uint256 expiration, bool isCallOption) external {
        require(ownerOf(nftId) == msg.sender, "Only the NFT owner can create options");
        require(expiration > block.timestamp, "Expiration date must be in the future");

        _optionIdCounter++;
        uint256 newOptionId = _optionIdCounter;

        options[newOptionId] = Option({
            seller: msg.sender,
            nftId: nftId,
            strikePrice: strikePrice,
            expiration: expiration,
            isCallOption: isCallOption
        });

        emit OptionCreated(newOptionId, nftId, strikePrice, expiration, isCallOption);
    }

    function exerciseOption(uint256 optionId) external payable {
        Option memory option = options[optionId];
        require(option.expiration > block.timestamp, "Option has expired");

        if (option.isCallOption) {
            require(msg.value == option.strikePrice, "Incorrect ETH amount for exercising the call option");
            _transfer(option.seller, msg.sender, option.nftId); // Transfer NFT to the buyer
            payable(option.seller).transfer(msg.value); // Send ETH to the seller
        } else {
            require(ownerOf(option.nftId) == msg.sender, "Only the NFT owner can exercise the put option");
            payable(msg.sender).transfer(option.strikePrice); // Transfer ETH to the buyer
            _transfer(msg.sender, option.seller, option.nftId); // Transfer NFT back to the seller
        }

        emit OptionExercised(optionId, msg.sender);
    }
}