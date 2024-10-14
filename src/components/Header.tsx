// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import WalletConnectButton from './WalletConnectButton';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold">
          CommunityWallet
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/learn" className="hover:underline">
                Learn
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
          </ul>
        </nav>
        <WalletConnectButton />
      </div>
    </header>
  );
};

export default Header;

