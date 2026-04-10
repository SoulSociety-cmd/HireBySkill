const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now }
});

const matchSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  score: { type: Number, required: true, min: 0, max: 100 },
  status: { 
    type: String, 
    enum: ['pending', 'invited', 'hired', 'rejected'], 
    default: 'pending' 
  },
  messages: [messageSchema],
  invitedAt: Date,
  hiredAt: Date
}, { timestamps: true });

matchSchema.index({ company: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Match', matchSchema);

