
require("dotenv").config();


module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    baseSepolia: {
      url: 'https://base-sepolia.g.alchemy.com/v2/kksljUTHDAvLBoe/${process.env.ALCHEMY_API_KEY}',
      accounts: [process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : ''],
    },
  },
};
