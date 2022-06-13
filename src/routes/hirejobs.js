const express = require('express')
const Router = express.Router()
const { HireController } = require('../controller/hirejobs')
const { protect, isCompany } = require('../middlewares/auth')
const uploadImg = require('../middlewares/uploadFile')

Router.post(
  '/',
  protect,
  isCompany,
  uploadImg.multipleUpload,
  HireController.CreateHire
).put(
  '/:idhirejob',
  protect,
  isCompany,
  uploadImg.multipleUpload,
  HireController.updateHire
)
  .delete('/:id', protect, isCompany, HireController.deleteHire)

module.exports = Router
