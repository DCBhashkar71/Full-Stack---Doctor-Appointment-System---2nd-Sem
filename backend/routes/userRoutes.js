const express = require('express');
const authUser = require('../Middleware/authUser');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  bookAppointment,
  getMyAppointments,
  cancelAppointment
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authUser, getUserProfile);
router.put('/profile', authUser, updateUserProfile);
router.post('/book-appointment', authUser, bookAppointment);
router.get('/my-appointments', authUser, getMyAppointments);
router.post('/cancel-appointment/:id', authUser, cancelAppointment);

module.exports = router;