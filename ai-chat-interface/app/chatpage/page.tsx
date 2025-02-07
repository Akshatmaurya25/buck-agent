"use client";

import { useState } from "react";
import Layout from "../../layout";
import ChatInterface from "../../chat-interface";
import Modal from "../../Model";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, base ,sei } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "cc7548b1e3c2739cec64c6295b58cd50",
  chains: [mainnet, base ,sei],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function Page() {
  const [isWalletConnected, setIsWalletConnected] = useState(true);

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Layout>{isWalletConnected && <ChatInterface />}</Layout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
