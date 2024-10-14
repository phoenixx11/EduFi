// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

// Configure chains (Base Sepolia as a custom chain)
const baseSepolia = {
  id: 84531,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  nativeCurrency: {
    name: 'Base Sepolia Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://sepolia.base.org',
  },
  blockExplorers: {
    default: { name: 'Base Sepolia Explorer', url: 'https://sepolia.base.org/' },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [baseSepolia, chain.mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'CommunityWallet',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
  document.getElementById('root')
);
