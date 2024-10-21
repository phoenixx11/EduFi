import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import ProofOfTimeNFTArtifact from '../../contracts/artifacts/contracts/VideoNFT.sol/ProofOfTimeNFT.json';

const provider = new ethers.providers.AlchemyProvider(process.env.NEXT_PUBLIC_RPC_URL); // Replace with your RPC URL
const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY!, provider); // Replace with your private key

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!; // Replace with your deployed contract address

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { nftId, strikePrice, expiration, isCallOption } = req.body;

            const contract = new ethers.Contract(contractAddress, ProofOfTimeNFTArtifact.abi, signer);

            // Call createOption function on your smart contract
            const tx = await contract.createOption(nftId, strikePrice, expiration, isCallOption);
            
            await tx.wait(); // Wait for transaction confirmation

            res.status(200).json({ message: 'Option created successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create option.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
