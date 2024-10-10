const express = require('express');
const dotenv = require('dotenv');
const chatbotRoutes = require('./routes/chatbotRoutes');
const cors = require('cors');
const path = require('path');
const { AzureOpenAI } = require('openai'); // Asegúrate de importar el cliente de OpenAI


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Servir los archivos estáticos desde 'frontend/public'
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Inicializa el cliente de OpenAI
const client = new AzureOpenAI({
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.AZURE_OPENAI_API_KEY,
});

// Rutas para el chatbot
app.use('/api', chatbotRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Ruta para manejar las solicitudes de chat
app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message; // El mensaje del usuario viene en el cuerpo de la solicitud

        const result = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are an AI assistant that helps people find information." },
                { role: "user", content: userMessage },
            ],
            max_tokens: 800,
            temperature: 0.7,
            top_p: 0.95,
        });

        res.json({ response: result.choices[0].message.content });
    } catch (error) {
        console.error("Error procesando la solicitud:", error); // Asegúrate de que esto esté presente
        res.status(500).json({ error: "Ocurrió un error al procesar la solicitud" });
    }
});
