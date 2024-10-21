
import { HardhatUserConfig } from "hardhat/types";
import { config as dotenvConfig } from "dotenv";
dotenvConfig(); // Load environment variables from .env file

import "@nomicfoundation/hardhat-toolbox"; // Hardhat toolbox for common tasks

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {}, // Local Hardhat network
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_URL || '', // Alchemy URL stored in env
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // Use private key from .env
    },
  },
};

export default config;
