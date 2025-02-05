import { createPublicClient, createWalletClient, http, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import dotenv from 'dotenv';

dotenv.config();

export class WalletAdapter {
    private publicClient;
    private walletClient;
    private account;

    constructor() {
        const privateKey = process.env.WALLET_PRIVATE_KEY;
        const rpcUrl = process.env.RPC_PROVIDER_URL;

        if (!privateKey?.startsWith('0x')) {
            throw new Error('Invalid WALLET_PRIVATE_KEY format');
        }
        if (!rpcUrl) {
            throw new Error('RPC_PROVIDER_URL is required');
        }

        this.account = privateKeyToAccount(privateKey as `0x${string}`);
        
        this.publicClient = createPublicClient({
            chain: base,
            transport: http(rpcUrl)
        });

        this.walletClient = createWalletClient({
            account: this.account,
            chain: base,
            transport: http(rpcUrl)
        });
    }

    async getBalance() {
        try {
            const balance = await this.publicClient.getBalance({
                address: this.account.address,
            });
            
            const formattedBalance = formatEther(balance);
            console.log("Raw balance:", balance.toString());
            console.log("Formatted balance:", formattedBalance);
            
            return {
                success: true,
                balance: formattedBalance,
                address: this.account.address
            };
        } catch (error) {
            console.error("Error fetching balance:", error);
            throw error;
        }
    }
}

export const walletAdapter = new WalletAdapter();
