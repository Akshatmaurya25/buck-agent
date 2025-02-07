import { walletFunctions } from "./goat/getBalance";

async function main() {
    try {
        const result = await walletFunctions.handler();
        
        if (result.success) {
            console.log("===============================");
            console.log(`Wallet Address: ${result.address}`);
            console.log(`Balance: ${result.balance} ETH`);
            console.log("===============================");
        } else {
            console.error("Error:", result.error);
        }
    } catch (error) {
        console.error("Failed to get balance:", error);
    }
}

main();
