// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="container mx-auto text-center px-4">
        <div className="mb-4">
          <Link to="/about" className="mx-2 hover:underline">
            About
          </Link>
          <Link to="/contact" className="mx-2 hover:underline">
            Contact
          </Link>
          <Link to="/privacy" className="mx-2 hover:underline">
            Privacy
          </Link>
          <Link to="/terms" className="mx-2 hover:underline">
            Terms
          </Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} CommunityWallet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
