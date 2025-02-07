import { GoatSDK } from '@goatsdk/core';

async function connectWallet() {
    try {
        const sdk = new GoatSDK();
        const wallet = await sdk.wallet.connect();
        console.log('Wallet connected:', wallet.address);
        return wallet;
    } catch (error) {
        console.error('Error connecting wallet:', error);
   
    }
}

async function main() {
    const wallet = await connectWallet();
    
}

main();