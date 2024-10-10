const { AzureOpenAI } = require('openai'); // O la librería que estés utilizando
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Inicializa el cliente de OpenAI
const client = new AzureOpenAI({
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.AZURE_OPENAI_API_KEY,
});

// Función para obtener la respuesta de OpenAI
async function getOpenAIResponse(userMessage) {
    const result = await client.chat.completions.create({
        messages: [
            { role: "system", content: "You are an AI assistant that helps people find information." },
            { role: "user", content: userMessage },
        ],
        max_tokens: 800,
        temperature: 0.7,
        top_p: 0.95,
    });

    return result.choices[0].message.content;
}

// Manejo de la conversación
async function handleChat(req, res) {
    const userMessage = req.body.message;

    try {
        const response = await getOpenAIResponse(userMessage);
        res.json({ reply: response });
    } catch (error) {
        console.error('Error in chatbot:', error);
        res.status(500).json({ error: 'Failed to generate response', details: error.message });
    }
}

module.exports = { handleChat };
