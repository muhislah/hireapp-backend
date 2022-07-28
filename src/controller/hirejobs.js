const { hireJobModel } = require('../models/hirejobs')
const createError = require('http-errors')
const common = require('../helper/common')
const jwt = require('jsonwebtoken')
const HireController = {
  CreateHire: (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const idcompany = decoded.idcompany
    // const idEmploye = req.params.id
    const data = {
      status: req.body.status || 0,
      idEmployee: req.body.idEmploye,
      hp: req.body.hp,
      deskripsi: req.body.deskripsi,
      tujuan: req.body.tujuan,
      address: req.body.address,
      email: req.body.email,
      fullname: req.body.fullname,
      idcompany
    }
    hireJobModel
      .insert(data)
      .then(() => {
        common.response(res, data, 'data success create', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  updateHire: (req, res, next) => {
    const { status, idEmployee } = req.body
    const data = {
      status,
      idEmployee
    }
    // eslint-disable-next-line camelcase
    const idhirejob = req.params.idhirejob
    console.log(data)
    hireJobModel
      .update({ ...data, idhirejob })
      .then(() => {
        common.response(res, data, 'data updated success', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  deleteHire: (req, res, next) => {
    const idhirejob = req.params.id
    // const name = req.body.name
    hireJobModel
      .deleteHire(idhirejob)
      .then(() => {
        res.status(200).json({
          message: 'deleted success',
          data: `idPortfolio : ${idhirejob}`
        })
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  }
}

module.exports = {
  HireController
}
