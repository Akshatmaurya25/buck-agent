
import { createPublicClient, formatEther, http } from "viem";
import { base } from "viem/chains";
import dotenv from 'dotenv';

dotenv.config();

const rpcUrl = process.env.RPC_PROVIDER_URL;

if (!rpcUrl) {
    throw new Error('RPC_PROVIDER_URL is required');
}

const publicClient = createPublicClient({
    chain: base,
    transport: http(rpcUrl)
});

interface WalletResponse {
    success: boolean;
    balance?: string;
    address?: string;
    error?: string;
}

export const getUserBalanceGeneralFunction = {
    name: "getUserBalanceGeneral",
    description: "Get the balance of a user-provided wallet address",
    parameters: {},

    async handler(): Promise<WalletResponse> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const question = (query: string): Promise<string> => {
            return new Promise(resolve => rl.question(query, resolve));
        };

        try {
            const address = await question('Please enter your wallet address: ');
            rl.close();

            const balance = await publicClient.getBalance({ 
                address: address as `0x${string}` 
            });
            const formattedBalance = formatEther(balance);

            console.log(`Balance for address ${address}:issssssssssss--------------> ${formattedBalance}`);
            return {
                success: true,
                balance: formattedBalance,
                address
            };
        } catch (error) {
            console.error("Error fetching balance:", error);
            rl.close();
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred'
            };
        }
    }
};

export const functions = [getUserBalanceGeneralFunction];