const env = require('../config/env');
const Usage = require('../models/Usage');
const ApiError = require('../utils/apiError');

const incrementUsage = async ({ userId, guestId, tool }) => {
  const query = userId ? { user: userId, tool } : { guestId, tool };
  await Usage.findOneAndUpdate(query, { $inc: { count: 1 } }, { upsert: true, new: true });
};

const enforceUsageLimit = (tool) => async (req, _res, next) => {
  if (req.user?.isPaid) return next();
  if (req.user) {
    await incrementUsage({ userId: req.user._id, tool });
    return next();
  }

  const guestId = req.headers['x-guest-id'];
  if (!guestId || typeof guestId !== 'string') return next(new ApiError(401, 'Guest id required'));

  const usage = await Usage.findOne({ guestId, tool });
  if (usage && usage.count >= env.GUEST_LIMIT) {
    return next(new ApiError(402, 'Guest usage limit reached. Please login and upgrade.'));
  }

  await incrementUsage({ guestId, tool });
  return next();
};

module.exports = enforceUsageLimit;
