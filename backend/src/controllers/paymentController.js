const User = require('../models/User');
const { createOrder } = require('../services/razorpayService');

const createPaymentOrder = async (_req, res, next) => {
  try {
    const order = await createOrder();
    return res.json({ success: true, data: order });
  } catch (error) {
    return next(error);
  }
};

const activatePlan = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isPaid: true });
    return res.json({ success: true, message: 'Plan activated' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createPaymentOrder, activatePlan };
