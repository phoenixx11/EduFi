import { ethers } from "hardhat";

async function main() {
    // Get the deployer account
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory for ProofOfTimeNFT
    const ProofOfTimeNFT = await ethers.getContractFactory("ProofOfTimeNFT");

    // Deploy the contract with customizable name and symbol
    const contract = await ProofOfTimeNFT.deploy("ProofOfTimeNFT", "POT");

    // Wait for the deployment to complete
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });