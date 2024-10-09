'use client';

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import styles from './walletConnectButton.module.css';

const WalletConnectButton: React.FC = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {account.isConnected ? (
        <button
          type="button"
          onClick={() => disconnect()}
          className={`${styles.button} ${styles.disconnectButton}`}
        >
          Disconnect
        </button>
      ) : (
        <div>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
              disabled={!connector.ready}
              className={`${styles.button} ${styles.connectButton}`}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
            </button>
          ))}
          {status === 'connecting' && <p className={styles.statusText}>Connecting...</p>}
          {error && <p className={styles.errorMessage}>{error.message}</p>}
        </div>
      )}
    </div>
  );
};

export default WalletConnectButton;
