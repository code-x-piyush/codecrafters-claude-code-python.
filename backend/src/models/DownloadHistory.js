const mongoose = require('mongoose');

const downloadHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    guestId: { type: String, default: null },
    tool: { type: String, required: true },
    filename: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DownloadHistory', downloadHistorySchema);
