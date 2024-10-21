# EduFi
Proof of transaction(Base Sepolia)-  0x0b1db56879fbe94e32736c64fdae5b6405331913a89aa948a59ee609c0f07ade
Contract (VideoNFT-ProofOfTime) deployed to: 0xc43454E7B30f1Be7962DbA89d93F7bc97e26cb5B

---
The NFTS that the educators earn on uploading a video of certain length gets a tradable NFT as option.
Options Functionality

The ProofOfTimeNFT contract enables NFT owners to create and manage options linked to their NFTs. This feature allows for trading financial instruments associated with NFTs.
Key Features
Option Struct: Represents an option with the following attributes:
seller: Address of the option seller.
nftId: ID of the associated NFT.
strikePrice: Price (in wei) to exercise the option.
expiration: Timestamp of when the option expires.
isCallOption: Indicates if the option is a call (true) or put (false).

Creating Options:
The createOption function allows NFT owners to create options, ensuring they own the NFT and the expiration is in the future.
Exercising Options:
The exerciseOption function allows users to exercise options:
Call Option: Buyer pays the strikePrice and receives the NFT.
Put Option: NFT owner sells the NFT back for the strikePrice.

Events
OptionCreated: Emitted when an option is created.
OptionExercised: Emitted when an option is exercised.

EduFi is a blockchain-powered educational platform designed to spread awareness and provide practical experience with blockchain and decentralized finance (DeFi). The platform offers courses for learners, allowing them to mint tradable NFTs(Proof of Time) upon course completion, and enables educators to contribute content and mint NFTs as options, 

Consumer focused platform with basenames
Endusers-learners,educators,developers
 
1. Frontend

Framework: Built using Next.js with TypeScript .
Styling: Uses CSS Modules for scoped styling, ensuring each component's style is encapsulated and maintainable.
Wallet Integration: coinbase wallet and metamask for wallet connection, allowing users to mint and NFTs(Proof of Time) .

2. Backend

Blockchain Integration: Utilizes Ethereum and Base (Layer 2) for contract deployment and interactions.
Smart Contracts: Developed with Solidity using Hardhat for contract development and testing. Contracts handle:
NFT Minting: For learners completing courses and educators submitting content.
DeFi Elements: NFTs are tradable as options, allowing users to engage with DeFi concepts while earning through education.

3. Challenges Solved

On-Chain Interaction: Ensured smooth minting of NFTs using the blockchain, handling transactions via MetaMask.
Smart Contract Deployment: Successfully deployed smart contracts on the Base Layer 2 testnet with error handling for secure transactions.
User Experience: Created a simple and intuitive platform, making blockchain education more accessible and rewarding through a practical, hands-on experience with blockchain technology and DeFi.
