const express = require('express')
const Router = express.Router()
const { nofitikasiController } = require('../controller/Notifikasi')
const { protect } = require('../middlewares/auth')

Router.get('/', protect, nofitikasiController.getNotifikasi)

module.exports = Router
