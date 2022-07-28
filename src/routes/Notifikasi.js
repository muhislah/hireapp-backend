const express = require('express')
const Router = express.Router()
const { nofitikasiController } = require('../controller/Notifikasi')
const { protect } = require('../middlewares/auth')
const employe = require('../middlewares/authEmployee')

Router
  // .get('/', protect, nofitikasiController.getNotifikasi)
  .get('/', employe.protect, nofitikasiController.getNotifikasiEmploye)
  .get('/', protect, nofitikasiController.getNotifikasiCompany)

module.exports = Router
