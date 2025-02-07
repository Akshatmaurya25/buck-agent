import dotenv from "dotenv";
dotenv.config();  // Load env variables immediately

import axios from "axios";

export const getMindShare = async (interval: 7|3 = 7, size  : number = 1) => {
    try {
      

        const baseurl = "https://api.cookie.fun";
        const apikey  =  "96835354-f428-4a67-a7dc-821c35572695";

        const res = await axios.get(`${baseurl}/v2/agents/agentsPaged?interval=_${interval}Days&page=1&pageSize=${size}`, {
            headers: {
                "x-api-key": apikey,  
            },
           
        });

    
        return res.data.ok.data;  
    } catch (error) {
        console.error("Error fetching mind share:", error);
        throw error;
    }
};
export const searchTwitter = async (query:string) => {
    try {

        const baseurl = "https://api.cookie.fun";
        const apikey  =  "96835354-f428-4a67-a7dc-821c35572695";
        const to = new Date().toISOString().split("T")[0];

        // Get last week's date in YYYY-MM-DD format
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const from = lastWeek.toISOString().split("T")[0];
        const res = await axios.get(`${baseurl}/v1/hackathon/search/${query}?from=${from}&to=${to}`, {
            headers: {
                "x-api-key": apikey,  
            },
           
        });

        console.log(res.data.ok  );
        return res.data.ok;  
    } catch (error) {
        console.error("Error fetching mind share:", error);
        throw error;
    }
};





// https://api.cookie.fun/v2/agents/agentsPaged?interval=_7Days&page=1&pageSize=2
// https://api.cookie.fun/v2/agents/agentsPaged?interval=_7Days&page=1&pageSize=2