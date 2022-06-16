const express = require('express')
const { companyController } = require('../controller/company')
const Router = express.Router()

Router.get('/', companyController.getCompany)
  .get('/employee/:id', companyController.getCompanyByEmployee)
  .get('/filter', companyController.getCompanyByFilter)
  .get('/idcompany', companyController.getDetailCompany)

module.exports = Router
