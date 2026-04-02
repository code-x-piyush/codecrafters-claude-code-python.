const express = require('express');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const { users, usage, messages } = require('../controllers/adminController');

const router = express.Router();

router.use(auth, adminOnly);
router.get('/users', users);
router.get('/usage', usage);
router.get('/messages', messages);

module.exports = router;
