const express = require('express')
const Router = express.Router()
const { portfolioController } = require('../controller/portfolio')
const uploadImg = require('../middlewares/uploadFile')

Router.get('/', portfolioController.getPortfolio)
  .post('/', uploadImg.multipleUpload, portfolioController.CreatePortfolio)
  .put('/:id', uploadImg.multipleUpload, portfolioController.updatePortoflio)
  .delete('/:id', portfolioController.deletePortfolio)

module.exports = Router
