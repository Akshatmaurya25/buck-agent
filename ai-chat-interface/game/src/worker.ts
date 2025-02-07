import { GameWorker } from "@virtuals-protocol/game";
import { helloFunction, searchTweetsFunction, replyToTweetFunction, postTweetFunction } from "./functions";
import { buyCryptoFunction, getCryptoPriceFunction, getWalletBalanceFunction, sellCryptoFunction, transferCryptoFunction ,getGeneralBalanceFunction, getSeiWalletBalance, transferSEI } from "./cryptoFunctions";
import { MindshareFunction, SearchTweet } from "./CookieSwarm/functions/Cookiefunctions";


export const helloWorker = new GameWorker({
    id: "hello_worker",
    name: "hello worker",
    description: "has the ability to say hello",
    functions: [helloFunction],
    getEnvironment: async () => {
        return {
            status: 'friendly',
            // Add any environment variables your worker needs
            someLimit: 10,
        };
    },
});

export const postTweetWorker = new GameWorker({
    id: "twitter_main_worker",
    name: "Twitter main worker",
    description: "Worker that posts tweets",
    functions: [searchTweetsFunction, replyToTweetFunction, postTweetFunction],
    // Optional: Provide environment to LLP
    getEnvironment: async () => {
        return {
            tweet_limit: 15,
        };
    },
});
export const cryptoWorker = new GameWorker({
    id: "crypto_worker",
    name: "Crypto worker",
    description: "This is the worker that will be used to interact with the crypto market, the user will be able to buy and sell crypto. Also the user will be able to see the crypto market and the crypto prices. User can also see the crypto news and the crypto trends. It is also able to transfer crypto to other wallets using wallet address",
    functions: [
       SearchTweet, 
        MindshareFunction,
        getCryptoPriceFunction,
        getSeiWalletBalance,
         transferSEI ,
         buyCryptoFunction,
          sellCryptoFunction,
           transferCryptoFunction,
            getWalletBalanceFunction,
            
            ],
    // Optional: Provide environment to LLP
    // getEnvironment: async () => {

    //     const walletAddress = "0x1234567890123456789012345678901234567890";
    //     return {
    //         walletAddress: walletAddress,
    //     };

    // },

});

