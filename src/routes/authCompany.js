const express = require('express')
const Router = express.Router()
const { authCompany } = require('../controller/authCompany')
// const { usersController } = require('../controller/users')
const { protect } = require('../middlewares/auth')
// const activasi = require('../middleware/activasi')

Router.post('/login', authCompany.loginCompany)
  .post('/register', authCompany.registerCompany)
  .get('/profile', protect, authCompany.profil)
  .post('/refreshtoken', authCompany.refreshToken)
  .post('/changePassword', authCompany.changePassword)
module.exports = Router
