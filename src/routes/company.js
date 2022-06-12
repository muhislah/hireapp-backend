const express = require('express')
const { companyController } = require('../controller/company')
const Router = express.Router()

Router.get('/', companyController.getCompany)
  .get('/employee/:id', companyController.getCompanyByEmployee)
  .get('/filter', companyController.getCompanyByFilter)

module.exports = Router
