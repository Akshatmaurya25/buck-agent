import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import dotenv from 'dotenv';


dotenv.config();

export const yatharthwalletFunction = {
  name: "getWalletBalance",
  description: "Get the current wallet balance",
  parameters: {},
  
  async handler() {
    try {
      const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
      
      const walletClient = createWalletClient({
        account,
        transport: http(process.env.RPC_PROVIDER_URL),
        chain: base,
      });

      const tools = await getOnChainTools({
        wallet: viem(walletClient),
      });

      const balance = await tools.getBalance({
        address: account.address,
      });

      return {
        success: true,
        balance: balance.toString(),
        address: account.address
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }
};


export const functions = [yatharthwalletFunction];