import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import dotenv from 'dotenv';
import { erc20, PEPE, USDC } from "@goat-sdk/plugin-erc20";


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
        plugins: [
          erc20({ tokens: [USDC, PEPE] }),
        ],

      });

      const balance = await tools.balanceof({
        address: account.address,
      });




      console.log("your balance is", balance);
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