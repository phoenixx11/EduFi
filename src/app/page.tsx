// src/app/page.tsx
'use client'

import Link from 'next/link';
import EducationComponent from '../components/EducationComponent';
import Testimonials from '../components/Testimonials';
import WalletConnectButton from '../components/WalletConnectButton';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const LandingPage: React.FC = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Updated Link without <a> */}
          <Link href="/" className="text-xl font-bold">
            CommunityWallet
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                {/* Updated Link without <a> */}
                <Link href="/learn" className="hover:underline">
                  Learn
                </Link>
              </li>
              <li>
                {/* Updated Link without <a> */}
                <Link href="/register" className="hover:underline">
                  Register
                </Link>
              </li>
              <li>
                {/* Updated Link without <a> */}
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
          <WalletConnectButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-100 py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Empowering Communities through Blockchain</h1>
          <p className="text-lg mb-8">
            Access healthcare aid, education scholarships, and banking services seamlessly.
          </p>
          <div className="flex justify-center space-x-4">
            {/* Updated Link without <a> */}
            <Link href="/learn" className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
              Learn More
            </Link>
            {/* Updated Link without <a> */}
            <Link href="/register" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Educational Component */}
      <EducationComponent />

      {/* Wallet Connection Section */}
      <div className="container mx-auto px-4 py-12">
        <div>
          <h2 className="text-3xl font-semibold text-center mb-8">Wallet Connection</h2>
          <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <div>
              <h3 className="text-2xl font-bold mb-4">Account</h3>
              <div className="mb-4">
                <p>Status: {account.status}</p>
                <p>Address: {JSON.stringify(account.address)}</p>
                <p>Chain ID: {account.chain?.id}</p>
              </div>
              {account.isConnected ? (
                <button
                  type="button"
                  onClick={() => disconnect()}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Disconnect
                </button>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Connect Wallet</h3>
                  {connectors.map((connector) => (
                    <button
                      key={connector.id}
                      onClick={() => connect({ connector })}
                      disabled={!connector.ready}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2 mb-2"
                    >
                      {connector.name}
                      {!connector.ready && ' (unsupported)'}
                    </button>
                  ))}
                  {status === 'connecting' && <p>Connecting...</p>}
                  {error && <p className="text-red-500">{error.message}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto text-center px-4">
          <div className="mb-4">
            {/* Updated Link without <a> */}
            <Link href="/about" className="mx-2 hover:underline">
              About
            </Link>
            {/* Updated Link without <a> */}
            <Link href="/contact" className="mx-2 hover:underline">
              Contact
            </Link>
            {/* Updated Link without <a> */}
            <Link href="/privacy" className="mx-2 hover:underline">
              Privacy
            </Link>
            {/* Updated Link without <a> */}
            <Link href="/terms" className="mx-2 hover:underline">
              Terms
            </Link>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} CommunityWallet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;




