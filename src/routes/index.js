const express = require('express')
const router = express.Router()

const employeeRouter = require('./employee')
const authRouter = require('./authEmployee')
const workExperienceRouter = require('./workExperience')

router
    .use('/employee', employeeRouter)
    .use('/auth', authRouter)
    .use('/work-experience', workExperienceRouter)

module.exports = router