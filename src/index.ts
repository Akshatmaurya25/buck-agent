
import { buck } from "./agent";



const state = {
    _responseString: '',
    get responseString() {
        return this._responseString;
    },
    set responseString(value: string) {
        this._responseString = value;
    }
};

export { state };

async function runagent(task:string) {
    try {
        // Initialize the agent
        await buck.init();

        // Create readline interface for user input
   
        
        console.log("Agent initialized. Enter your task (type 'exit' to quit):");
        const worker = buck.getWorkerById("crypto_worker");
        try {
                      await worker.runTask(task, { verbose: true });
                       return state.responseString;
                    
                    } catch (error) {
                        console.error("Error executing task:", error);
                    }
        // rl.on("line", async (task) => {
        //     if (task.toLowerCase() === "exit") {
        //         console.log("Exiting...");
        //         rl.close();
        //         return;
        //     }

        //     const worker = buck.getWorkerById("crypto_worker");
        //     if (worker) {
        //         console.log(`Running task: ${task}`);
        //         try {
        //             await worker.runTask(task, { verbose: true });
        //             console.log("Task completed.");
        //         } catch (error) {
        //             console.error("Error executing task:", error);
        //         }
        //     } else {
        //         console.error("Worker not found.");
        //     }

        //     console.log("\nEnter another task (or type 'exit' to quit):");
        // });

    
    } catch (error) {
        console.error("Error running agent:", error);
    }
}


export default runagent;