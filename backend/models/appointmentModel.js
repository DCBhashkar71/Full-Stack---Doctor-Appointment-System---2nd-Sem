const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },
  slotDate: { 
    type: String, 
    required: true 
  },                    // Format: YYYY-MM-DD
  slotTime: { 
    type: String, 
    required: true 
  },                    // Format: HH:MM
  amount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  paymentId: { 
    type: String 
  },                    // Razorpay payment ID
  isPaid: { 
    type: Boolean, 
    default: false 
  },
  isCompleted: { 
    type: Boolean, 
    default: false 
  },
  isCancelled: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);