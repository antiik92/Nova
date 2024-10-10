const express = require('express');
const { handleChat } = require('../utils/openaiClient');

const router = express.Router();

router.post('/chat', handleChat);

module.exports = router;
