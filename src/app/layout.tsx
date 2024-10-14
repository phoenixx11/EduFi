// src/app/layout.tsx
'use client';

import React from 'react';
import  OnchainProviders  from './OnchainProviders';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css'; // Ensure Tailwind CSS is imported

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * RootLayout component that wraps all pages with Providers, Header, and Footer.
 */
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <OnchainProviders>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </OnchainProviders>
      </body>
    </html>
  );
};

export default RootLayout;



