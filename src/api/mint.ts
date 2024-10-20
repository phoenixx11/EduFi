// src/pages/api/mint.ts
import { ethers } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';
import VideoNFTAbi from '../../abis/VideoNFT.json'; // ABI file

const contractAddress = '0xYourContractAddress'; // Replace with your contract address
const privateKey = '0xYourPrivateKey'; // Replace with your server wallet's private key

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { videoURI } = req.body;

  if (!videoURI) {
    return res.status(400).json({ message: 'Missing videoURI' });
  }

  try {
    // Setup provider and signer
    const provider = new ethers.providers.JsonRpcProvider('https://base-sepolia.g.alchemy.com/v2/kksljUTHDAvLBoe'); 
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, VideoNFTAbi, wallet);

    // Interact with the contract to mint the NFT
    const tx = await contract.mintNFT(wallet.address, videoURI);
    await tx.wait();

    res.status(200).json({ message: 'Future NFT minted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Minting failed', error });
  }
}
