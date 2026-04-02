const express = require('express');
const { chat, summarize } = require('../controllers/aiController');
const optionalAuth = require('../middleware/optionalAuth');
const enforceUsageLimit = require('../middleware/guestLimit');

const router = express.Router();

router.post('/chat', optionalAuth, enforceUsageLimit('ai-chat'), chat);
router.post('/summarize', optionalAuth, enforceUsageLimit('ai-summarize'), summarize);

module.exports = router;
