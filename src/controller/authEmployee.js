const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { findByEmail, create, updateProfile, changePassword, getprofil } = require('../models/authEmployee')
const commonHelper = require('../helper/common')
const authHelper = require('../helper/authEmployee')
const cloudinary = require('../helper/cloudinary')

const register = async (req, res, next) => {
  try {
    const { fullname, email, phonenumber, password } = req.body
    const { rowCount } = await findByEmail(email)

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    if (rowCount) {
      return next(createError(403, 'user sudah terdaftar'))
    }
    const data = {
      idemployee: uuidv4(),
      fullname,
      email,
      phonenumber,
      password: passwordHash,
      role: 'employee'
    }
    console.log(data)
    await create(data)
    commonHelper.response(res, data, 'User berhasil register', 200)
  } catch (error) {
    console.log(error)
    next(createError())
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const {
      rows: [user]
    } = await findByEmail(email)
    console.log(user)

    if (!user) {
      return commonHelper.response(
        res,
        null,
        'email atau password anda salah',
        403
      )
    }

    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return commonHelper.response(
        res,
        null,
        'email atau password anda salah',
        403
      )
    }
    delete user.password

    const payload = {
      fullname: user.fullname,
      email: user.email,
      id: user.idemployee
    }

    user.token = authHelper.generateToken(payload)
    user.refreshToken = authHelper.generateRefreshToken(payload)
    // console.log(user)
    return commonHelper.response(res, user, 'anda berhasil login', 201)
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken
  const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT2)
  const payload = {
    email: decoded.email,
    role: decoded.role
  }
  const result = {
    token: authHelper.generateToken(payload),
    refreshToken: authHelper.generateRefreshToken(payload)
  }
  commonHelper.response(res, result, 'token berhasil', 200)
}

const updateProfileEmployee = async (req, res, next) => {
  try {
    const idemployee = req.params.idemployee
    const gambars = req.file.path
    // console.log(req.file)
    const ress = await cloudinary.uploader.upload(gambars)
    const {
      fullname,
      email,
      phonenumber,
      jobs,
      workplace,
      address,
      description,
      skill,
      active,
      idportfolio,
      idexperience
    } = req.body
    const data = {
      idemployee,
      fullname,
      email,
      phonenumber,
      jobs,
      workplace,
      address,
      description,
      skill: skill,
      image: ress.url,
      active,
      idportfolio,
      idexperience,
      role: 'employee'
    }
    await updateProfile(data)
    commonHelper.response(res, data, 'update user success', 201)
  } catch (error) {
    console.log(error)
  }
}

const changePasswordEmployee = (req, res, next) => {
  changePassword(req.body)
    .then(() => {
      res.json({
        message: 'password has been changed'
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

const getProfil = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
    const idemployee = decoded.id
    console.log(idemployee)
    const result = await getprofil(idemployee)

    commonHelper.response(res, result.rows, 'Get profil data success', 200)
  } catch (error) {
    console.log(error)
    next(createError)
  }
}
module.exports = {
  register,
  login,
  refreshToken,
  updateProfileEmployee,
  changePasswordEmployee,
  getProfil
}
