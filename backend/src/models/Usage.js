const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    guestId: { type: String, default: null, index: true },
    tool: { type: String, required: true },
    count: { type: Number, default: 1 },
  },
  { timestamps: true }
);

usageSchema.index({ user: 1, tool: 1 }, { unique: true, partialFilterExpression: { user: { $type: 'objectId' } } });
usageSchema.index({ guestId: 1, tool: 1 }, { unique: true, partialFilterExpression: { guestId: { $type: 'string' } } });

module.exports = mongoose.model('Usage', usageSchema);
