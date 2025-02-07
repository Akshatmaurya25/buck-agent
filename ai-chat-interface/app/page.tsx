"use client"

// import Sofa from "@/sofa";
// import Page from "../page"
import Component from "@/app/landing-page"

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  base,
  sei,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId:'cc7548b1e3c2739cec64c6295b58cd50',
  chains: [mainnet, base,sei],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function SyntheticV0PageForDeployment() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {/* Your App */}
          <div>
            {/* <Page /> */}
            <Component />
            {/* <Sofa /> */}
          </div>
      
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    
)}