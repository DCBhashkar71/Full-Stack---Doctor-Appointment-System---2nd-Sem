const Doctor = require('../models/doctorModel');

// Get All Doctors (used by frontend)
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ available: true });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
};

// Get single doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doctor' });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById
};