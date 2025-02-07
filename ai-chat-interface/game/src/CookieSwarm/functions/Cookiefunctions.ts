import {
    GameFunction,
    ExecutableGameFunctionResponse,
    ExecutableGameFunctionStatus,
} from "@virtuals-protocol/game";
import { getMindShare, searchTwitter } from "../api/apifunctions";
import { state } from "../..";
import { number } from "zod";
type AgentData = {
    agentName: string;
    contracts: any[]; // Replace 'any' with the actual contract type if known
    twitterUsernames: string[];
    mindshare: number;
    mindshareDeltaPercent: number;
    marketCap: number;
    marketCapDeltaPercent: number;
    price: number;
    priceDeltaPercent: number;
    liquidity: number;
    volume24Hours: number;
    volume24HoursDeltaPercent: number;
    holdersCount: number;
    holdersCountDeltaPercent: number;
    averageImpressionsCount: number;
    averageImpressionsCountDeltaPercent: number;
    averageEngagementsCount: number;
    averageEngagementsCountDeltaPercent: number;
    followersCount: number;
    smartFollowersCount: number;
    topTweets: any[]; // Replace 'any' with a more specific type if available
};
interface TweetData {
    authorUsername: string;
    createdAt: string;
    engagementsCount: number;
    impressionsCount: number;
    isQuote: boolean;
    isReply: boolean;
    likesCount: number;
    quotesCount: number;
    repliesCount: number;
    retweetsCount: number;
    smartEngagementPoints: number;
    text: string;
    matchingScore: number;
  }

export const MindshareFunction = new GameFunction({
    name: "MindshareFunction",
    description: "Provides Twitter account with highest mindshare. User might provide a time interval and a limit of how many accounts they want. Example prompt: Give top 5 agents on Twitter with highest mindshare in last 7 days.",
    args: [
        { name: "interval", type: "number", description: "Defines how recent data user wants of mindshare. Example: Last 7 Days" },
        { name: "size", type: "number", description: "How many accounts need to be retrieved. Example: top 10" },
    ] as const,
    executable: async (args) => {
        try {
            const interval = args.interval ? parseInt(args.interval) : undefined;
            const size = args.size ? parseInt(args.size) : 3;

            if (interval !== 7 && interval !== 3) {
                throw new Error("Interval must be 7 or 3 days");
            }
            
            const result = await getMindShare(interval, size);
            console.log("Mindshare function ", result )
            console.log(
                `The top ${size} mindshare accounts in the last ${interval} days are: ${result
                    .map((acc: AgentData) => `${acc.agentName} (${acc.mindshare})`)
                    .join(", ")}`
            );
           
            state.responseString =    `The top ${size} mindshare accounts in the last ${interval} days are: ${result
                    .map((acc: AgentData, index:number) => ` \n${index+1}. ${acc.agentName} with mindshare (${acc.mindshare.toFixed(2)})`)
                    .join(", ")}`
           
            
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Done,
                "Action completed successfully"
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Failed,
                errorMessage
            );
        }
    },
});

export const SearchTweet = new GameFunction({
    name: "SearchTweet",
    description: "It searches for a query in twitter. It could perform search operation. Example: Search for Cookie in twiiter ",
    args: [
        { name: "query", type: "string", description: "Query is something thats needed to be searched on twitter by user." },
       
    ] as const,
    executable: async (args) => {
        try {
            if (!args.query) {
                throw new Error("Query parameter is required.");
            }
            console.log("Searching twitter")
            const query = args.query  ;;
            const result = await searchTwitter(query);
            state.responseString = `Top Twitter results from the search:\n ${result
                .map((tweet:TweetData, index:number) => `\n${index + 1}. @${tweet.authorUsername} (${new Date(tweet.createdAt).toLocaleDateString()})
                   "${tweet.text}"
                   • ${tweet.likesCount} likes • ${tweet.retweetsCount} retweets • ${tweet.repliesCount} replies
                   • Engagement: ${tweet.engagementsCount} • Impressions: ${tweet.impressionsCount}
                   • Matching Score: ${tweet.matchingScore.toFixed(2)}`)
                .join("")}`
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Done,
                "Action completed successfully"
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            return new ExecutableGameFunctionResponse(
                ExecutableGameFunctionStatus.Failed,
                errorMessage
            );
        }
    },
});
