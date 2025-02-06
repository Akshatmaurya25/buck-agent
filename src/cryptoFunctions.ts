import { ExecutableGameFunctionResponse, ExecutableGameFunctionStatus, GameFunction } from "@virtuals-protocol/game";
import { walletFunctions } from "./goat/getBalance";
import { transfertokenFunction } from "./goat/transferToken";

interface CryptoError extends Error {
  code?: string;
  details?: string;
}

const handleError = (error: unknown): ExecutableGameFunctionResponse => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  console.error('Function error:', error);
  return new ExecutableGameFunctionResponse(
    ExecutableGameFunctionStatus.Failed,
    `Action failed: ${errorMessage}`
  );
};

export const transferCryptoFunction = new GameFunction({
    name: "transferCrypto",
    description: "Transfer crypto to other wallets using wallet address",
    args: [
        { name: "walletAddress", type: "string", description: "The wallet address to transfer the crypto to" },
        { name: "amount", type: "string", description: "The amount of crypto to transfer" },
        { name: "crypto", type: "string", description: "The crypto to transfer" },
    ] as const,
    executable: async (args, logger) => {
        try {
            if (!args.walletAddress || !args.amount || !args.crypto) {
                throw new Error("All parameters are required");
            }
             // Ensure wallet address starts with '0x'
        if (!args.walletAddress.startsWith("0x")) {
            throw new Error("Invalid wallet address format. Must start with '0x'.");
        }
        const parsedAmount = parseFloat(args.amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            throw new Error("Amount must be a valid number greater than 0");
        }

        logger?.(`Transferring ${parsedAmount} ${args.crypto} to ${args.walletAddress}`);
        console.log?.(`Transferring ${args.amount} ${args.crypto} to ${args.walletAddress}`);
        const decimals = 6;
        // Convert to string first to handle decimal places properly
        const scaledAmountNumber =  Math.pow(10, decimals) *parsedAmount  ;
        // Then round and convert to BigInt      
        const scaledAmount = BigInt(Math.round(scaledAmountNumber));

    
    
        const formattedAddress = args.walletAddress as `0x${string}`;
            const result = await transfertokenFunction.handler(formattedAddress, scaledAmount);
            console.log("Function result:", result); // Debug log
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Done,
                "Transfer completed successfully"
            );
        } catch (error) {
            return handleError(error);
        }
    },
});

export const getCryptoPriceFunction = new GameFunction({
    name: "getCryptoPrice",
    description: "Get the price of a crypto",
    args: [
        { name: "crypto", type: "string", description: "The crypto to get the price of" },
        { name: "currency", type: "string", description: "The currency to get the price in" },
    ] as const,
    executable: async (args, logger) => {
        try {
            logger?.(`Getting the price of ${args.crypto} in ${args.currency}`);
            console.log(`Getting the price of ${args.crypto} in ${args.currency}`);
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Done,
                "Action completed successfully"

            );
        } catch (e) {
            return handleError(e);
        }
    },
});
export const buyCryptoFunction = new GameFunction({
    name: "buyCrypto",
    description: "Buy a crypto",
    args: [
        { name: "crypto", type: "string", description: "The crypto to buy" },
        { name: "amount", type: "number", description: "The amount of crypto to buy" },
    ] as const,
    executable: async (args, logger) => {
        try {
            logger?.(`Buying ${args.amount} of ${args.crypto}`);
            console.log(`Buying ${args.amount} of ${args.crypto}`);
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Done,
                "Action completed successfully"

            );
        } catch (e) {
            return handleError(e);
        }
    },
});
export const sellCryptoFunction = new GameFunction({
    name: "sellCrypto",
    description: "Sell a crypto",
    args: [
        { name: "crypto", type: "string", description: "The crypto to sell" },
        { name: "amount", type: "number", description: "The amount of crypto to sell" },
    ] as const,

    executable: async (args, logger) => {
        try {
            logger?.(`Selling ${args.amount} of ${args.crypto}`);
            console.log(`Selling ${args.amount} of ${args.crypto}`);
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Done,

                "Action completed successfully"

            );
        } catch (e) {
            return handleError(e);
        }
    },
});
export const getWalletBalanceFunction = new GameFunction({
    name: "getWalletBalance",
    description: "Get the balance of wallet configured in environment",
    args: [] as const,
    executable: async (_, logger) => {
        try {
            logger?.("Fetching wallet balance...");
            const result = await walletFunctions.handler();
            console.log("Function result:", result); // Debug log

            if (!result.success || !result.balance) {
                throw new Error(result.error || "Failed to fetch balance");
            }

            const response = `Wallet Balance: ${result.balance} ETH\nAddress: ${result.address}`;
            logger?.(response);
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Done,
                response
            );
        } catch (error) {
            console.error("Balance fetch error:", error);
            return handleError(error);
        }
    }
});