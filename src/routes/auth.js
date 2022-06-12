const express = require('express')
const router = express.Router()
const upload = require('../middlewares/uploadFile')
const {register, login, refreshToken, updateProfileEmployee} = require('../controller/auth')

router
    .post('/register', register)
    .post('/login', login)
    .post('/refresh-token', refreshToken)
    .put('/:id_employee', upload.single('image'), updateProfileEmployee)


module.exports = router