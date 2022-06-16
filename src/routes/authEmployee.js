const express = require('express')
const router = express.Router()
const upload = require('../middlewares/uploadFile')
const { register, activ, login, refreshToken, updateProfileEmployee, changePasswordEmployee, getProfil } = require('../controller/authEmployee')
const { protect } = require('../middlewares/authEmployee')

router
  .get('/profil', protect, getProfil)
  .get('/activasi/:token', activ)
  .post('/register', register)
  .post('/login', login)
  .post('/refresh-token', refreshToken)
  .put('/update-profil', upload.singleUpload, updateProfileEmployee)
  .post('/change-password', changePasswordEmployee)

module.exports = router
