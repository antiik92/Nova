const { AzureOpenAI } = require('openai');
require('dotenv').config();

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const apiKey = process.env["AZURE_OPENAI_API_KEY"];
const apiVersion = "2024-05-01-preview";
const deployment = "gpt-nova-test";

const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

async function getOpenAIResponse(userMessage) {
    const result = await client.chat.completions.create({
        messages: [
            { role: "system", content: "You are an AI assistant." },
            { role: "user", content: userMessage }
        ],
        max_tokens: 800
    });
    
    return result.choices[0].message.content;
}

module.exports = { getOpenAIResponse };
