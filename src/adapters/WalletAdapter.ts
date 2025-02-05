import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { viem } from "@goat-sdk/wallet-viem";

export class WalletAdapter {
    private walletClient;
    private tools;

    constructor() {
        if (!process.env.WALLET_PRIVATE_KEY) {
            throw new Error('WALLET_PRIVATE_KEY is required');
        }
        if (!process.env.RPC_PROVIDER_URL) {
            throw new Error('RPC_PROVIDER_URL is required');
        }

        const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);
        this.walletClient = createWalletClient({
            account,
            transport: http(process.env.RPC_PROVIDER_URL),
            chain: base,
        });
    }

    // ...existing methods...
}
