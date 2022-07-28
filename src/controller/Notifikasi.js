const { notifikasiModel } = require('../models/notifikasi')
const createError = require('http-errors')
const common = require('../helper/common')
const jwt = require('jsonwebtoken')

const nofitikasiController = {

  getNotifikasi: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const idcompany = decoded.idcompany
      const idemployee = decoded.idemployee
      console.log(idcompany)
      if (idemployee) {
        notifikasiModel
          .getNotif(idemployee)
          .then(({ rows }) => {
            common.response(res, rows, 'notifikasi anda', 200)
          })
          .catch((error) => {
            console.log(error)
            next(createError)
          })
      }
      if (idcompany) {
        notifikasiModel
          .getNotifCompany(idcompany)
          .then(({ rows }) => {
            common.response(res, rows, 'notifikasi anda', 200)
          })
          .catch((error) => {
            console.log(error)
            next(createError)
          })
      }
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },

  getNotifikasiCompany: (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const idcompany = decoded.idcompany
    console.log(idcompany)
    notifikasiModel
      .getNotifCompany(idcompany)
      .then(({ rows }) => {
        common.response(res, rows, 'notifikasi anda', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  getNotifikasiEmploye: (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
    const idemployee = decoded.idemployee
    console.log(idemployee)
    notifikasiModel
      .getNotif(idemployee)
      .then(({ rows }) => {
        common.response(res, rows, 'notifikasi anda', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  }
//   getNotifikasi: async (req, res, next) => {
//     try {
//       //   const idEmployee = req.params.id
//       const {
//         rows: [result],
//       } = await notifikasiModel.getNotif();
//       common.response(res, result, "notifikasinya adalah", 200);
//     } catch (error) {
//       next(createError);
//     }
//   },
}
module.exports = {
  nofitikasiController
}
