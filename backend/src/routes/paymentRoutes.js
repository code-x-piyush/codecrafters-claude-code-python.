const express = require('express');
const { createPaymentOrder, activatePlan } = require('../controllers/paymentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/order', auth, createPaymentOrder);
router.post('/activate', auth, activatePlan);

module.exports = router;
