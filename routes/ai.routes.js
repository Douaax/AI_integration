// src/routes/ai.routes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

// POST /ai/summarize
router.post('/summarize', aiController.summarizeText);

// POST /ai/ask
router.post('/ask', aiController.askQuestion);

module.exports = router;
