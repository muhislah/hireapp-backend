const express = require('express')
const router = express.Router()

const employeeRoutes = require('./employee')

router
    .use('/employee', employeeRoutes)

module.exports = router