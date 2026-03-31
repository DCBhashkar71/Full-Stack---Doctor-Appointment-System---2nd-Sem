const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');

// Get All Doctors
const getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find({ available: true });
  res.json(doctors);
};

// Get Doctor by ID
const getDoctorById = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.json(doctor);
};

// Doctor Dashboard (Appointments)
const getDoctorAppointments = async (req, res) => {
  const appointments = await Appointment.find({ doctorId: req.doctor.id })
    .populate('userId', 'name email');
  res.json(appointments);
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  getDoctorAppointments
};