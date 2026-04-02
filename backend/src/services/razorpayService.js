const Razorpay = require('razorpay');
const env = require('../config/env');

const razorpay = env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: env.RAZORPAY_KEY_ID, key_secret: env.RAZORPAY_KEY_SECRET })
  : null;

const createOrder = async (amount = 49900, currency = 'INR') => {
  if (!razorpay) {
    return { id: 'demo_order_id', amount, currency };
  }
  return razorpay.orders.create({ amount, currency, receipt: `receipt_${Date.now()}` });
};

module.exports = { createOrder };
