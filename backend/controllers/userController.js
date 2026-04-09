const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, 'patient')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id, user.role)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) res.json(user);
  else res.status(404).json({ message: 'User not found' });
};

// Update Profile
const updateUserProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(user);
};

// Book Appointment
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime, amount } = req.body;
    const doctor = await Doctor.findById(docId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    // Check if slot is already booked
    const isBooked = doctor.slotsBooked.some(slot => slot.date === slotDate && slot.time === slotTime);
    if (isBooked) return res.status(400).json({ message: 'Slot already booked' });

    doctor.slotsBooked.push({ date: slotDate, time: slotTime });
    await doctor.save();

    const appointment = await Appointment.create({
      userId: req.user.id,
      doctorId: docId,
      slotDate,
      slotTime,
      amount
    });

    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Appointments
const getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({ userId: req.user.id })
    .populate('doctorId', 'name speciality image fees');
  res.json(appointments);
};

// Cancel Appointment
const cancelAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

  appointment.isCancelled = true;
  await appointment.save();
  res.json({ success: true, message: 'Appointment cancelled' });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  bookAppointment,
  getMyAppointments,
  cancelAppointment
};