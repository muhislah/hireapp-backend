const express = require('express')
const { companyController } = require('../controller/company')
const Router = express.Router()

Router.get('/', companyController.getCompany)

module.exports = Router
