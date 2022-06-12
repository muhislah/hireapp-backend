const express = require('express')
const { companyController } = require('../controller/company')
const Router = express.Router()

Router.get('/', companyController.getCompany)
  .get('/filter', companyController.getCompanyByFilter)

module.exports = Router
