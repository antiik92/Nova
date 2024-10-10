const { getOpenAIResponse } = require('../utils/openaiClient');

async function handleChat(req, res) {
    const userMessage = req.body.message;
    
    try {
        const response = await getOpenAIResponse(userMessage);
        res.json({ reply: response });
    } catch (error) {
        console.error('Error in chatbot:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
}

module.exports = { handleChat };
