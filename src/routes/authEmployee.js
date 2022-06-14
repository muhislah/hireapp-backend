const express = require('express')
const router = express.Router()
const upload = require('../middlewares/uploadFile')
const {register, login, refreshToken, updateProfileEmployee, changePasswordEmployee} = require('../controller/authEmployee')
const {protect} = require('../middlewares/authEmployee')

router
    .post('/register', register)
    .post('/login', login)
    .post('/refresh-token', refreshToken)
    .put('/:id_employee', protect, upload.single('image'), updateProfileEmployee)
    .post('/change-password', protect, changePasswordEmployee)


module.exports = router