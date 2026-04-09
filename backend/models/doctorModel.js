const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String 
  },                    // Cloudinary image URL
  speciality: { 
    type: String, 
    required: true 
  },
  degree: { 
    type: String, 
    required: true 
  },
  experience: { 
    type: String, 
    required: true 
  },
  about: { 
    type: String 
  },
  fees: { 
    type: Number, 
    required: true 
  },
  address: {
    line1: { type: String },
    line2: { type: String }
  },
  available: { 
    type: Boolean, 
    default: true 
  },
  slotsBooked: [
    {
      date: { type: String },   // YYYY-MM-DD
      time: { type: String }    // HH:MM
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);