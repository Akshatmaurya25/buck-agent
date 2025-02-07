"use client"

import { useState } from 'react';
import Layout from '../../layout';
import ChatInterface from '../../chat-interface';
import Modal from '../../Model';

// import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Page() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // Logic to connect the wallet
    setIsWalletConnected(true);
  };

  return (
    <Layout>
      {!isWalletConnected && (
        <Modal isOpen={!isWalletConnected} onClose={() => {}}>
          <p className="mb-4 flex justify-center items-center">Please connect your wallet to interact with the chat interface.</p>
          <div className='flex justify-center items-center'>
            <button
              onClick={handleConnectWallet}
              className="bg-[#3C2322] text-[#F1E9E9] px-4 py-2 rounded hover:bg-[#2E2E2E] transition duration-300 "
            >
              Connect Wallet
              {/* <ConnectButton /> */}
            </button>
          </div>
        </Modal>
      )}
      {isWalletConnected && <ChatInterface />}
    </Layout>
  );
}