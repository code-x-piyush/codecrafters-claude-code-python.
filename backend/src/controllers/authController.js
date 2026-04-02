const { z } = require('zod');
const User = require('../models/User');
const ApiError = require('../utils/apiError');
const { signToken } = require('../services/tokenService');

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const register = async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: payload.email });
    if (exists) return next(new ApiError(409, 'Email already registered'));

    const user = await User.create(payload);
    const token = signToken(user._id);

    return res.status(201).json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role, isPaid: user.isPaid } },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return next(new ApiError(401, 'Invalid credentials'));
    }

    const token = signToken(user._id);
    return res.json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, email: user.email, role: user.role, isPaid: user.isPaid } },
    });
  } catch (error) {
    return next(error);
  }
};

const me = async (req, res) => {
  return res.json({ success: true, data: req.user });
};

module.exports = { register, login, me };
