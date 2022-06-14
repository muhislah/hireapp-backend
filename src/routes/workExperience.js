const express = require('express')
const router = express.Router()

const {createWorkExperience, updateWorkExperience, deleteWorkExperience, searchWorkExperience} = require('../controller/workExperience')
const {protect}  = require('../middlewares/authEmployee')
router
    .post('/', protect,  createWorkExperience)
    .put('/:id_experience', protect,  updateWorkExperience)
    .delete('/:id_experience', protect,  deleteWorkExperience)
    .get('/', protect, searchWorkExperience)

module.exports = router