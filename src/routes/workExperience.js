const express = require('express')
const router = express.Router()

const { createWorkExperience, updateWorkExperience, deleteWorkExperience, searchWorkExperience } = require('../controller/workExperience')
const { protect } = require('../middlewares/authEmployee')
router
  .post('/', protect, createWorkExperience)
  .put('/:idexperience', protect, updateWorkExperience)
  .delete('/:idexperience', protect, deleteWorkExperience)
  .get('/', protect, searchWorkExperience)

module.exports = router
