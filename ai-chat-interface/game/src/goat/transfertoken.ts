import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { walletAdapter } from "../adapters/WalletAdapter";
import dotenv from "dotenv";
import { WalletAdapter, walletAdapterSEI } from "../adapters/WalletAdapterSei";

dotenv.config();

interface WalletResponse {
  success: boolean;
  hash?: string;
  address?: string;
  error?: string;
}

export const transfertokenFunction = {
  name: "transferToken",
  description: "transfer token to other wallets using wallet address",
  parameters: {},

  async handler(to: `0x${string}`, amount: bigint, crypto?:string): Promise<WalletResponse> {
    try {
      if (!to.startsWith("0x")) {
        throw new Error(
          "Invalid wallet address format. It must start with '0x'."
        );
      }
      let transfer;
      if(crypto?.toLocaleLowerCase()== "sei"){
         transfer = await walletAdapterSEI.transferTokenSEI(to, amount)
      }
      else{

        
        
         transfer = await walletAdapter.transferToken(to, amount);
      }

      if (!transfer.hash) {
        throw new Error("Failed to fetch balance");
      }

      return {
        success: true,
        hash: transfer.hash,
        address: transfer.address,
      };
    } catch (error) {
      console.error("Wallet error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      };
    }
  },
};

export const functions = [transfertokenFunction];
