const express = require('express');
const dotenv = require('dotenv');
const chatbotRoutes = require('./routes/chatbotRoutes');
const cors = require('cors');
const path = require('path');
const { AzureOpenAI } = require('openai'); 

dotenv.config();

const client = new AzureOpenAI({
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.AZURE_OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Ruta para manejar las solicitudes a la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html')); // Cambia 'index.html' por tu archivo principal
});

// Rutas para el chatbot
app.use('/api', chatbotRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
