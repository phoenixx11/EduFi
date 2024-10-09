// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="container mx-auto text-center px-4">
        <div className="mb-4">
          <Link to="/about" className={styles.footerLink}>
            About
          </Link>
          <Link to="/contact" className={styles.footerLink}>
            Contact
          </Link>
          <Link to="/privacy" className={styles.footerLink}>
            Privacy
          </Link>
          <Link to="/terms" className={styles.footerLink}>
            Terms
          </Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} CommunityWallet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

