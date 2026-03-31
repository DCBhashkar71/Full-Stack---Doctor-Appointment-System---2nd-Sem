const express = require('express');
const { getAllDoctors } = require('../controllers/doctorController');

const router = express.Router();

// Get all doctors (used by frontend)
router.get('/list', getAllDoctors);

module.exports = router;