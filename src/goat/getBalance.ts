import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { walletAdapter } from "../adapters/WalletAdapter";
import dotenv from 'dotenv';

dotenv.config();

interface WalletResponse {
  success: boolean;
  balance?: string;
  address?: string;
  error?: string;
}

export const yatharthwalletFunction = {
  name: "getWalletBalance",
  description: "Get the current wallet balance",
  parameters: {},
  
  async handler(): Promise<WalletResponse> {        
    try {
      const walletData = await walletAdapter.getBalance();
      console.log("Wallet data:", walletData); 
      
      if (!walletData.balance) {
        throw new Error("Failed to fetch balance");
      }

      return {
        success: true,
        balance: walletData.balance,
        address: walletData.address
      };
    } catch (error) {
      console.error('Wallet error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  }
};

export const functions = [yatharthwalletFunction];