import { ExecutableGameFunctionResponse, ExecutableGameFunctionStatus, GameFunction } from "@virtuals-protocol/game";

export const transferCryptoFunction = new GameFunction({
    name: "transferCrypto",
    description: "Transfer crypto to other wallets using wallet address",
    args: [
        { name: "walletAddress", type: "string", description: "The wallet address to transfer the crypto to" },
        { name: "amount", type: "number", description: "The amount of crypto to transfer" },
        { name: "crypto", type: "string", description: "The crypto to transfer" },
    ] as const,
    executable: async (args, logger) => {
        try {
            logger?.(`Transfering ${args.amount}, ${args.crypto} to ${args.walletAddress}`);
            console.log(`Transfering ${args.amount}, ${args.crypto} to ${args.walletAddress}`);
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Done,
                "Action completed successfully"

            );
        } catch (e) {
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Failed,
                "Action failed"
            );
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
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Failed,
                "Action failed"
            );
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
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Failed,
                "Action failed"
            );
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
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Failed,
                "Action failed"
            );
        }
    },
});
export const getWalletBalanceFunction = new GameFunction({
    name: "getWalletBalance",
    description: "Get the balance of a wallet",
    args: [
        { name: "walletAddress", type: "string", description: "The wallet address to get the balance of" }
    ] as const,

    executable: async (args, logger) => {
        try {
            logger?.(`Getting the balance of ${args.walletAddress}`);
            console.log(`Getting the balance of ${args.walletAddress}`);
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Done,


                "Action completed successfully"

            );
        } catch (e) {
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Failed,
                "Action failed"
            );
        }
    },
});