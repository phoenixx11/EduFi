import { ethers } from "hardhat";

async function main() {
  // Retrieve the list of signers
  const signers = await ethers.getSigners();
  const deployer = signers[0]; // Use the first signer as the deployer

  console.log("Deploying contracts with the account:", deployer.address);

  // Check the balance of the deployer
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");

  // Get the contract factory
  const VideoNFT = await ethers.getContractFactory("ProofOfLearningNFT");

  // Deploy the contract
  const videoNFT = await VideoNFT.deploy();

  // Wait for the contract to be deployed
  await videoNFT.deployed();

  console.log("VideoNFT deployed to:", videoNFT.address);
}

// Execute the main function and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});






