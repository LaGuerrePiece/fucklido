import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react'

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
  ],
  [
    infuraProvider({ apiKey: 'a035e52afe954afe9c45e781080cde98' }),
    alchemyProvider({ apiKey: 'VkrAJOLRBt1bb5p3ypYrQj84QElpex8g' }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode chains={chains} theme={midnightTheme({
            accentColor: '#0d76fc',  //color of wallet  try #703844
            accentColorForeground: 'white', //color of text
            borderRadius: 'large', //rounded edges
            fontStack: 'system',  
          })}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>
);
