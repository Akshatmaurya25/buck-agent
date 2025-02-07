import { createPublicClient, createWalletClient, http, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";
import dotenv from 'dotenv';
import CurrencyConverter from '../utils/rateconversion';

dotenv.config();

export class WalletAdapter {
    private publicClient;
    private walletClient;
    private account;

    constructor() {
        const privateKey = process.env.WALLET_PRIVATE_KEY;
        const rpcUrl = process.env.RPC_PROVIDER_URL;

        if (!privateKey?.startsWith('0x')) {
           console.error('Invalid WALLET_PRIVATE_KEY format');
        }
        if (!rpcUrl) {
            console.error('RPC_PROVIDER_URL is required');
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
            
            // // Convert balance to multiple currencies
            // const converted = await CurrencyConverter.convertETHToMultipleCurrencies(balance);
            // const formattedBalance = CurrencyConverter.formatCurrencyResponse(converted);
            
            return {
                success: true,
                balance: balance,
                address: this.account.address
            };
        } catch (error) {
            console.error("Error fetching balance:", error);
            throw error;
        }
    }
    async transferToken(to :`0x${string}`, amount:bigint) {
        try {
            
     
        const hash = await this.walletClient.sendTransaction({
            account: this.account, 
            to,
            value: amount,
          })
          console.log("Transaction url:", `https://basescan.org/tx/${hash}`);
          return {
            success: true,
            hash: hash,
            address: this.account.address
        };   } catch (error) {
            console.error("Error transferring token:", error);
            console.error("Error transferring token - account:", to);
            throw error;
            
        }
    }
}

export const walletAdapter = new WalletAdapter();
