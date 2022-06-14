const { notifikasiModel } = require('../models/notifikasi')
const createError = require('http-errors')
const common = require('../helper/common')

const nofitikasiController = {
  getNotifikasi: (req, res, next) => {
    notifikasiModel
      .getNotif()
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
