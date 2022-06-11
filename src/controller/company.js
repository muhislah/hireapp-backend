const companyModel = require('../models/company')
const createError = require('http-errors')

const companyController = {
  getCompany: (req, res, next) => {
    companyModel.modelCompany.select()
      .then((result) => {
        res.json(result)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  }
}

module.exports = {
  companyController
}
