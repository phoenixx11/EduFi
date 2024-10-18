// src/app/educator/page.tsx
'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const EducatorDashboard: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { t, i18n } = useTranslation();
  const [videoURI, setVideoURI] = useState<string>('');
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes('video')) {
      const videoHash = 'ipfs://' + file.name;
      setVideoURI(videoHash);
      toast.success(t('uploadSuccess') + ': ' + file.name);
    } else {
      toast.error(t('uploadError'));
    }
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => handleLanguageChange(i18n.language === 'en' ? 'hi' : 'en')}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            {t('langSwitch')}
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">{t('title')}</h1>

        <div
          className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 ${
            dragging ? 'border-2 border-green-500' : 'border-2 border-gray-300'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <h2 className="text-2xl font-semibold mb-4">{t('dragDropInstruction')}</h2>
          {videoURI ? (
            <p className="text-green-500">
              {t('uploadSuccess')}: {videoURI}
            </p>
          ) : (
            <div className="h-32 border-dashed border-2 border-gray-400 flex items-center justify-center">
              <p className="text-gray-500">{t('dragDropInstruction')}</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{t('uploadedVideos')}</h2>
          {/* Add video listing logic */}
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">{t('mintOption')}</h2>
          {/* Add Mint Option logic */}
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4">{t('futureNFTs')}</h2>
          {/* Add Future NFTs logic */}
        </div>
      </div>
    </>
  );
};

export default EducatorDashboard;

