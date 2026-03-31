const express = require('express');
const authAdmin = require('../Middleware/authAdmin');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  addDoctor,
  getAllAppointments
} = require('../controllers/adminController');

const router = express.Router();

router.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
router.get('/all-appointments', authAdmin, getAllAppointments);

module.exports = router;