const express = require('express');
const dotenv = require('dotenv');
const chatbotRoutes = require('./routes/chatbotRoutes');
const cors = require('cors');
const path = require('path');

dotenv.config(); // Carga las variables de entorno al inicio

const app = express();
app.use(cors());
app.use(express.json());

// Servir los archivos estáticos desde 'frontend/public'
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Rutas para el chatbot
app.use('/api', chatbotRoutes);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
