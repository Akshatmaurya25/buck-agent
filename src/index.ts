import { buck } from "./agent";
import readline from "readline";

async function main() {
    try {
        // Initialize the agent
        await buck.init();

        // Create readline interface for user input
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log("Agent initialized. Enter your task (type 'exit' to quit):");

        rl.on("line", async (task) => {
            if (task.toLowerCase() === "exit") {
                console.log("Exiting...");
                rl.close();
                return;
            }

            const worker = buck.getWorkerById("crypto_worker");
            if (worker) {
                console.log(`Running task: ${task}`);
                try {
                    await worker.runTask(task, { verbose: true });
                    console.log("Task completed.");
                } catch (error) {
                    console.error("Error executing task:", error);
                }
            } else {
                console.error("Worker not found.");
            }

            console.log("\nEnter another task (or type 'exit' to quit):");
        });

    } catch (error) {
        console.error("Error running agent:", error);
    }
}

main();
