// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import WalletConnectButton from './WalletConnectButton';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className={styles.logo}>
          CommunityWallet
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/learn" className={styles.navLink}>
                Learn
              </Link>
            </li>
            <li>
              <Link to="/register" className={styles.navLink}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className={styles.navLink}>
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
