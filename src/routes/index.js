const express = require('express')
const Router = express.Router()

const employeeRoutes = require('./employee')
const companyRouter = require('./company')
const authController = require('./authCompany')
const portfolioRouter = require('./portfolio')

Router.use('/employee', employeeRoutes)
  .use('/company', companyRouter)
  .use('/portfolio', portfolioRouter)
  .use('/auth', authController)
module.exports = Router
