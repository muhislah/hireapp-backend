const express = require('express')
const Router = express.Router()
const { portfolioController } = require('../controller/portfolio')
const { protect, isCompany } = require('../middlewares/auth')
const uploadImg = require('../middlewares/uploadFile')

Router.get('/', protect, portfolioController.getPortfolio)
  .post(
    '/',
    protect,
    isCompany,
    uploadImg.multipleUpload,
    portfolioController.CreatePortfolio
  )
  .put(
    '/:id',
    protect,
    isCompany,
    uploadImg.multipleUpload,
    portfolioController.updatePortoflio
  )
  .delete('/:id', protect, isCompany, portfolioController.deletePortfolio)

module.exports = Router
