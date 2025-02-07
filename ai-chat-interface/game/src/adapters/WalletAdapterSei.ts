import { createPublicClient, createWalletClient, http, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {  seiTestnet } from "viem/chains";
import dotenv from 'dotenv';
import CurrencyConverter from '../utils/rateconversion';
import { bigIntToDecimal } from "../utils/BigIntDecimalConversions";

dotenv.config();

export class WalletAdapter {
    private publicClient;
    private walletClient;
    private account;

    constructor() {
        const privateKey = process.env.WALLET_PRIVATE_KEY;
        const rpcUrl = process.env.RPC_PROVIDER_URL_SEI;

        if (!privateKey?.startsWith('0x')) {
            // throw new Error('Invalid WALLET_PRIVATE_KEY format');
            console.error('Invalid WALLET_PRIVATE_KEY format')
            
        }
        if (!rpcUrl) {
            throw new Error('RPC_PROVIDER_URL is required');
        }

        this.account = privateKeyToAccount(privateKey as `0x${string}`);
        
        this.publicClient = createPublicClient({
            chain: seiTestnet,
            transport: http(rpcUrl)
        });

        this.walletClient = createWalletClient({
            account: this.account,
            chain: seiTestnet,
            transport: http(rpcUrl)
        });
    }

    async getBalance() {
        try {
            const balance = await this.publicClient.getBalance({
                address: this.account.address,
            });
            
         
            
            return {
                success: true,
                balance: bigIntToDecimal(balance),
                address: this.account.address
            };
        } catch (error) {
            console.error("Error fetching balance:", error);
            throw error;
        }
    }
    async transferTokenSEI(to :`0x${string}`, amount:bigint) {
        try {
            
     
        const hash = await this.walletClient.sendTransaction({
            account: this.account, 
            to,
            value: amount,
          })
          console.log("Transaction url:", `https://seitrace.com/tx/${hash}?chain=atlantic-2`);
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

export const walletAdapterSEI = new WalletAdapter();
