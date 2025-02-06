import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem,} from "@goat-sdk/wallet-viem";
import { createWalletClient, http, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import dotenv from 'dotenv';
import { walletAdapter, WalletAdapter } from "../adapters/WalletAdapter";


dotenv.config();

interface FormattedBalance {
  eth: string;
  usdc: string;
  inr: string;
}

interface WalletResponse {
  success: boolean;
  balance?: FormattedBalance;
  address?: string;
  error?: string;
}


const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
const client = createWalletClient({
  account,
  transport: http(process.env.RPC_PROVIDER_URL),
  chain: base,
});
export const walletFunctions = {
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

export default walletFunctions;