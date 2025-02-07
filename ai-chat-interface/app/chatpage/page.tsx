"use client"

import { useState } from 'react';
import Layout from '../../layout';
import ChatInterface from '../../chat-interface';
import Modal from '../../Model';


import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


import { ConnectButton } from '@rainbow-me/rainbowkit';



const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId:'cc7548b1e3c2739cec64c6295b58cd50',
  chains: [mainnet, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function Page() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // Logic to connect the wallet
    setIsWalletConnected(true);
  };

  return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Layout>
              {!isWalletConnected && (
                <Modal isOpen={!isWalletConnected} onClose={() => {}}>
                  <p className="mb-4 flex justify-center items-center">Please connect your wallet to interact with the chat interface.</p>
                  <div className='flex justify-center items-center'>
                    {/* <button
                      onClick={handleConnectWallet}
                      className="bg-[#3C2322] text-[#F1E9E9] px-4 py-2 rounded hover:bg-[#2E2E2E] transition duration-300 "
                    >
                      Connect Wallet
                    </button> */}
                      <ConnectButton onConnect={handleConnectWallet} />
                  </div>
                </Modal>
              )}
              {isWalletConnected && <ChatInterface />}
            </Layout>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
  );
}