// src/app/educator/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import EducatorHeader from '../../components/EducatorHeader';
import { useAccount, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import contractABI from '../../contracts/EducatorCertificate.json';
import axios from 'axios';

interface Video {
  id: number;
  uri: string;
  timestamp: number;
}

interface Option {
  tokenId: number;
  videoId: number;
  strikePrice: number;
  expiration: number;
  isExercised: boolean;
}

const EducatorDashboard: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [videoURI, setVideoURI] = useState<string>('');
  const [strikePrice, setStrikePrice] = useState<number>(0);
  const [expiration, setExpiration] = useState<number>(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  // Fetch existing videos and options from the contract
  useEffect(() => {
    if (isConnected && address) {
      // Implement functions to fetch videos and options from the contract
      // This requires adding view functions in the smart contract to retrieve data
      // For simplicity, we'll assume data is fetched and setVideos and setOptions accordingly
    }
  }, [isConnected, address]);

  // Handle video upload (e.g., uploading to IPFS)
  const handleUploadVideo = async () => {
    if (!videoURI) {
      toast.error('Please enter a video URI.');
      return;
    }

    try {
      // Upload video metadata to IPFS or your preferred storage
      // For demonstration, we'll assume the video is already uploaded and URI is provided

      // Call the smart contract to upload the video
      const { config } = usePrepareContractWrite({
        address: '0xYourEducatorContractAddressHere', // Replace with your deployed EducatorCertificate contract address
        abi: contractABI.abi,
        functionName: 'uploadVideo',
        args: [videoURI],
      });

      const { write } = useContractWrite(config);

      if (write) {
        write();
        toast.info('Video upload transaction sent!');
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to upload video.');
    }
  };

  // Handle minting of Option NFT
  const handleMintOption = async (videoId: number) => {
    if (!strikePrice || !expiration) {
      toast.error('Please enter strike price and expiration.');
      return;
    }

    try {
      // Define the tokenURI for the Option NFT
      const optionMetadata = {
        name: `Option for Video ${videoId}`,
        description: `Option to access Video ID ${videoId}`,
        image: 'https://your-image-host.com/option.png', // Replace with your image URL
        attributes: [
          { trait_type: 'Video ID', value: videoId },
          { trait_type: 'Strike Price', value: strikePrice },
          { trait_type: 'Expiration', value: expiration },
        ],
      };

      // Upload Option metadata to IPFS
      const ipfsResponse = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', optionMetadata, {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': 'your_pinata_api_key', // Replace with your Pinata API Key
          'pinata_secret_api_key': 'your_pinata_secret_api_key', // Replace with your Pinata Secret API Key
        },
      });

      const optionTokenURI = ipfsResponse.data.IpfsHash;

      // Prepare the contract write configuration
      const { config } = usePrepareContractWrite({
        address: '0xYourEducatorContractAddressHere', // Replace with your deployed EducatorCertificate contract address
        abi: contractABI.abi,
        functionName: 'mintOptionNFT',
        args: [
          address,
          videoId,
          ethers.utils.parseEther(strikePrice.toString()), // Assuming strikePrice is in ETH
          expiration,
          `ipfs://${optionTokenURI}`,
        ],
      });

      const { write } = useContractWrite(config);

      if (write) {
        write();
        toast.info('Option NFT mint transaction sent!');
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to mint Option NFT.');
    }
  };

  return (
    <>
      <EducatorHeader />
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Educator Dashboard</h1>

        {/* Video Upload Section */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Upload New Video</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="videoURI">
              Video URI (e.g., IPFS link)
            </label>
            <input
              id="videoURI"
              type="text"
              placeholder="https://ipfs.io/ipfs/your_video_hash"
              value={videoURI}
              onChange={(e) => setVideoURI(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            onClick={handleUploadVideo}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload Video
          </button>
        </div>

        {/* Mint Option NFT Section */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Mint Option NFT</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="videoId">
              Select Video ID
            </label>
            <select
              id="videoId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setStrikePrice(Number(e.target.value))}
            >
              <option value="">--Select Video--</option>
              {videos.map((video) => (
                <option key={video.id} value={video.id}>
                  {video.id}: {video.uri}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="strikePrice">
              Strike Price (ETH)
            </label>
            <input
              id="strikePrice"
              type="number"
              placeholder="0.05"
              value={strikePrice}
              onChange={(e) => setStrikePrice(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiration">
              Expiration Timestamp
            </label>
            <input
              id="expiration"
              type="number"
              placeholder="Unix Timestamp (e.g., 1700000000)"
              value={expiration}
              onChange={(e) => setExpiration(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            onClick={() => handleMintOption(Number(strikePrice))}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Mint Option NFT
          </button>
        </div>

        {/* Display Uploaded Videos */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Uploaded Videos</h2>
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Video ID</th>
                <th className="py-2 px-4 border-b">URI</th>
                <th className="py-2 px-4 border-b">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video.id}>
                  <td className="py-2 px-4 border-b text-center">{video.id}</td>
                  <td className="py-2 px-4 border-b">
                    <a href={video.uri} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      View Video
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {new Date(video.timestamp * 1000).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Display Minted Option NFTs */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Minted Option NFTs</h2>
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Token ID</th>
                <th className="py-2 px-4 border-b">Video ID</th>
                <th className="py-2 px-4 border-b">Strike Price (ETH)</th>
                <th className="py-2 px-4 border-b">Expiration</th>
                <th className="py-2 px-4 border-b">Exercised</th>
              </tr>
            </thead>
            <tbody>
              {options.map((option) => (
                <tr key={option.tokenId}>
                  <td className="py-2 px-4 border-b text-center">{option.tokenId}</td>
                  <td className="py-2 px-4 border-b text-center">{option.videoId}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {ethers.utils.formatEther(option.strikePrice.toString())}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {new Date(option.expiration * 1000).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {option.isExercised ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EducatorDashboard;
