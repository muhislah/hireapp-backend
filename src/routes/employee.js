const express = require('express')
const router = express.Router()
const employeeController = require('../controller/employee')

router .get('/', employeeController.getEmploye)

module.exports = router