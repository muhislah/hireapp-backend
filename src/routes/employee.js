const express = require('express')
const router = express.Router()
const {getEmploye, getDetailEmployee} = require('../controller/employee')
const {protect} = require('../middlewares/authEmployee')

router 
    .get('/', protect, getEmploye)
    .get('/:id_employee', protect, getDetailEmployee)
module.exports = router