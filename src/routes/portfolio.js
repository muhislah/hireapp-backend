const express = require('express')
const Router = express.Router()
const { portfolioController } = require('../controller/portfolio')
const { protect } = require('../middlewares/authEmployee')
const uploadImg = require('../middlewares/uploadFile')

Router.get('/', portfolioController.getPortfolio)
  .post(
    '/',
    protect,
    uploadImg.multipleUpload,
    portfolioController.CreatePortfolio
  )
  .put(
    '/:id',
    protect,
    uploadImg.multipleUpload,
    portfolioController.updatePortoflio
  )
  .delete('/:id', protect, portfolioController.deletePortfolio)

module.exports = Router
