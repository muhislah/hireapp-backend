const express = require('express')
const router = express.Router()

const employeeRouter = require('./employee')
const authRouter = require('./auth')
const workExperienceRouter = require('./workExperience')

router
    .use('/employee', employeeRouter)
    .use('/users', authRouter)
    .use('/work-experience', workExperienceRouter)

module.exports = router