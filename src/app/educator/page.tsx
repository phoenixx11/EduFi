// src/app/educator/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Video {
  id: number;
  uri: string;
  timestamp: number;
  length: number; // Video length in seconds
}

const EducatorDashboard: React.FC = () => {
  const [videoURI, setVideoURI] = useState<string>('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [dragging, setDragging] = useState<boolean>(false);
  const [videoLength, setVideoLength] = useState<number>(0);
  const [isMinting, setIsMinting] = useState(false);
  const [strikePrice, setStrikePrice] = useState<number>(0);
  const [expirationTimestamp, setExpirationTimestamp] = useState<number>(0);
  const [isCreatingOption, setIsCreatingOption] = useState(false);

  // Load video data (in production, you'd fetch from a backend)
  useEffect(() => {
    // Load existing videos or other logic
  }, []);

  // Function to call the backend API to mint Future NFT
  const mintFutureNFT = async () => {
    if (videos.length < 1) {
      toast.error('You need at least 1 video uploaded to mint a Future NFT.');
      return;
    }

    if (videos[0].length < 120) {
      toast.error('Your video must be longer than 2 minutes to mint this NFT.');
      return;
    }

    setIsMinting(true);

    try {
      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoURI }),
      });

      if (response.ok) {
        toast.success('Future NFT minted successfully!');
      } else {
        toast.error('Failed to mint NFT.');
      }
    } catch (error) {
      toast.error('An error occurred while minting the NFT.');
    } finally {
      setIsMinting(false);
    }
  };

  // Function to create an option for the NFT
  const createOption = async () => {
    if (!videoURI) {
      toast.error('You need to mint an NFT before creating an option.');
      return;
    }

    if (strikePrice <= 0) {
      toast.error('Strike price must be greater than zero.');
      return;
    }

    if (expirationTimestamp <= Date.now() / 1000) { // Check if expiration is in the future
      toast.error('Expiration date must be in the future.');
      return;
    }

    setIsCreatingOption(true);

    try {
      const response = await fetch('/api/create-option', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nftId: videos[0].id, // Assuming you are creating an option for the first video
          strikePrice,
          expiration: expirationTimestamp,
          isCallOption: true, // Change this based on user selection
        }),
      });

      if (response.ok) {
        toast.success('Option created successfully!');
      } else {
        toast.error('Failed to create option.');
      }
    } catch (error) {
      toast.error('An error occurred while creating the option.');
    } finally {
      setIsCreatingOption(false);
    }
  };

  // Handle Drag and Drop for Video Upload
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.includes('video')) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        const lengthInSeconds = Math.round(video.duration);
        setVideoLength(lengthInSeconds);

        if (lengthInSeconds >= 120) {
          // Simulate setting video URI after upload (e.g., to IPFS)
          const videoHash = 'ipfs://' + file.name; // Simulate the IPFS hash
          setVideoURI(videoHash);
          setVideos([...videos, { id: videos.length + 1, uri: videoHash, timestamp: Date.now(), length: lengthInSeconds }]);
          toast.success('Video uploaded: ' + file.name);
        } else {
          toast.error('Video must be at least 2 minutes long.');
        }
      };
    } else {
      toast.error('Please upload a valid video file.');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-8 rounded-lg mb-8 shadow-lg">
          <h1 className="text-4xl font-bold text-center">Welcome to Your Educator Dashboard!</h1>
          <p className="text-lg text-center mt-4">
            Manage your content, mint NFTs, and track your progress. Let's create the future of education together!
          </p>
        </div>

        {/* Video Upload Section */}
        <div
          className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 ${dragging ? 'border-2 border-green-500' : 'border-2 border-gray-300'}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <h2 className="text-2xl font-semibold mb-4">Drag & Drop to Upload Videos</h2>
          {videoURI ? (
            <p className="text-green-500">Video Uploaded: {videoURI}</p>
          ) : (
            <div className="h-32 border-dashed border-2 border-gray-400 flex items-center justify-center">
              <p className="text-gray-500">Drag & Drop Video File Here</p>
            </div>
          )}
        </div>

        {/* Mint Future NFT Section */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Mint Future NFT</h2>
          <button
            onClick={mintFutureNFT}
            disabled={isMinting}
            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isMinting ? 'cursor-not-allowed' : ''
            }`}
          >
            {isMinting ? 'Minting...' : 'Mint Future NFT'}
          </button>
        </div>

        {/* Create Option Section */}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Create Option</h2>
          
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="strikePrice">
            Strike Price (in wei):
            <input
              type="number"
              id="strikePrice"
              value={strikePrice}
              onChange={(e) => setStrikePrice(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter strike price"
            />
          </label>

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiration">
            Expiration Timestamp:
            <input
              type="datetime-local"
              id="expiration"
              onChange={(e) => setExpirationTimestamp(new Date(e.target.value).getTime() / 1000)} // Convert to seconds since epoch
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>

          <button
            onClick={createOption}
            disabled={isCreatingOption}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isCreatingOption ? 'cursor-not-allowed' : ''
            }`}
          >
            {isCreatingOption ? 'Creating Option...' : 'Create Option'}
          </button>
        </div>
      </div>
    </>
  );
};

export default EducatorDashboard;
