const express = require('express')
const router = express.Router()
const {getEmploye, getDetailEmployee} = require('../controller/employee')

router 
    .get('/', getEmploye)
    .get('/:id_employee', getDetailEmployee)
module.exports = router