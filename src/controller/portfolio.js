const { portfolioModel } = require('../models/portfolio')
const createError = require('http-errors')
const common = require('../helper/common')

const portfolioController = {
  getPortfolio: (req, res, next) => {
    portfolioModel
      .getPortfolio()
      .then((result) => {
        common.response(res, result, 'get data portfolio', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  CreatePortfolio: (req, res, next) => {
    const gambar = req.files.map((file) => {
      return `http://${req.get('host')}/img/${file.filename}`
    })
    const { nameApps, respository, type, idEmployee } = req.body
    const data = {
      nameApps,
      respository,
      type,
      image: gambar,
      idEmployee
    }

    portfolioModel
      .insert(data)
      .then(() => {
        common.response(res, data, 'data success create', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  updatePortoflio: (req, res, next) => {
    const gambar = req.files.map((file) => {
      return `http://${req.get('host')}/img/${file.filename}`
    })
    const { nameApps, respository, type, idEmployee } = req.body
    const data = {
      nameApps,
      respository,
      type,
      image: gambar,
      idEmployee
    }
    // eslint-disable-next-line camelcase
    const idPortfolio = req.params.id
    portfolioModel
      .update(data, idPortfolio)
      .then(() => {
        common.response(res, data, 'data updated success', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  deletePortfolio: (req, res, next) => {
    const idPortfolio = req.params.id
    // const name = req.body.name
    portfolioModel
      .deletePortfolio(idPortfolio)
      .then(() => {
        res.status(200).json({
          message: 'deleted success',
          data: `idPortfolio : ${idPortfolio}`
        })
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  }
}

module.exports = {
  portfolioController
}
