const express = require('express')
const router = express.Router()

const {createWorkExperience, updateWorkExperience, deleteWorkExperience, searchWorkExperience} = require('../controller/workExperience')

router
    .post('/', createWorkExperience)
    .put('/:id_experience', updateWorkExperience)
    .delete('/:id_experience', deleteWorkExperience)
    .get('/', searchWorkExperience)

module.exports = router