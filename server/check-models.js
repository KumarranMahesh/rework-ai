require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        const modelResponse = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
        // Note: The SDK doesn't have a direct "list models" helper in all versions, 
        // but let's try a standard fetch to the API directly to see what's available.
        
        console.log("Checking API Key availability...");
        // We will try to run a simple prompt on the most standard legacy model first
        // If this fails, we know it's an API Key/Account issue.
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Test");
        console.log("Success! 'gemini-pro' is working.");
    } catch (error) {
        console.error("Error details:", error.message);
        console.log("\n--- TROUBLESHOOTING ---");
        if (error.message.includes("404")) {
        console.log("1. Your API Key might be valid, but the Model Name is wrong.");
        console.log("2. Try using: 'gemini-1.0-pro' or 'gemini-1.5-flash-latest'");
        } else if (error.message.includes("API key")) {
        console.log("Your API Key is invalid or not being read from .env");
        }
    }
}

listModels();