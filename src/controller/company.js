const { modelCompany } = require('../models/company')
const createError = require('http-errors')
const common = require('../helper/common')
const companyController = {
  getCompany: (req, res, next) => {
    modelCompany
      .select()
      .then((result) => {
        res.json(result)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },

  getCompanyByFilter: async (req, res, next) => {
    try {
      const sort = req.query.sort
      const type = req.query.type
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 100
      const offset = (page - 1) * limit
      const search = req.query.search
      console.log(search)
      console.log(type)
      const result = await modelCompany.filterCompany({
        search,
        sort,
        type,
        limit,
        offset
      })
      const {
        rows: [count]
      } = await modelCompany.countCompany()
      const totalData = parseInt(count.total)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage
      }
      if (result.length === 0) {
        res.json({
          msg: 'data not found'
        })
      }
      common.response(
        res,
        result.rows,
        'get filter data success',
        200,
        pagination
      )
      // res.status(200).json({
      //   data: result.rows,
      //   pagination,
      // });
    } catch (error) {
      console.log(error)
      next(createError)
    }
  }
}

module.exports = {
  companyController
}
