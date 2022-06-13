const express = require('express')
const Router = express.Router()
const { nofitikasiController } = require('../controller/Notifikasi')

Router.get('/', nofitikasiController.getNotifikasi)

module.exports = Router
