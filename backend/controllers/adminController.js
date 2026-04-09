const Doctor = require('../models/doctorModel');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const Appointment = require('../models/appointmentModel');

// Multer setup for image upload
const upload = multer({ dest: 'uploads/' });

// Add Doctor (Admin only)
const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const doctor = await Doctor.create({
      name,
      email,
      password,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    });

    res.status(201).json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Appointments (Admin)
const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate('userId doctorId');
  res.json(appointments);
};

module.exports = {
  addDoctor,
  getAllAppointments
};