import { ethers } from "hardhat";

async function main() {
  const VideoNFT = await ethers.getContractFactory("ProofOfLearningNFT");

  const videoNFT = await VideoNFT.deploy();

  
  // Wait for the contract to be deployed
  await videoNFT.deployed();

  console.log("Deploying contracts with the account:", VideoNFT.address);

}

// Execute the main function and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




//https://base-sepolia.g.alchemy.com/v2/kksljUTHDAvLBoe/${process.env.ALCHEMY_API_KEY}'



