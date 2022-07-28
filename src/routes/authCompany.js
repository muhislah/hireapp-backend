const express = require('express')
const Router = express.Router()
const { authCompany } = require('../controller/authCompany')
// const { usersController } = require('../controller/users')
const { protect } = require('../middlewares/auth')
// const activasi = require('../middleware/activasi')
const uploadImg = require('../middlewares/uploadFile')

Router.post('/login', authCompany.loginCompany)
  .get('/profile', protect, authCompany.profil)
  .post('/register', authCompany.registerCompany)
  .get('/profile', protect, authCompany.profil)
  .post('/refreshtoken', authCompany.refreshToken)
  .post('/changePassword', authCompany.changePassword)
  .get('/activasi/:token', authCompany.activasi)
  .put(
    '/update-profil',
    uploadImg.singleUpload,
    protect,
    authCompany.updateProfil
  )
module.exports = Router
