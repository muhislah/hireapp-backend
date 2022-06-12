const { authModel } = require('../models/authCompany')
const common = require('../helper/common')
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const authHelper = require('../helper/auth')

const authCompany = {
  loginCompany: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const {
        rows: [user]
      } = await authModel.FindEmail(email)
      console.log(user)
      if (!user) {
        return res.json({
          message: 'data yang anda inputkan salah'
        })
      }
      const invalidPassword = bcrypt.compareSync(password, user.password)
      // console.log(password)
      if (!invalidPassword) {
        return res.json({
          message: ' data yang anda inputkan salah'
        })
      }
      delete user.password
      const payload = {
        email: user.email,
        id: user.idcompany,
        fullname: user.fullname,
        phonenumber: user.phonenumber,
        company: user.company,
        position: user.position,
        role: user.role
      }
      user.token = authHelper.generateToken(payload)
      const newRefreshToken = await authHelper.generateRefreshToken(payload)
      const data = {
        email,
        id: user.idcompany,
        token: user.token,
        fullname: user.fullname,
        phonenumber: user.phonenumber,
        company: user.company,
        position: user.position,
        refreshToken: newRefreshToken
      }
      common.response(res, data, 'selemat anda berhasil login', 200)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },

  registerCompany: async (req, res, next) => {
    try {
      const { fullname, password, email, company, phonenumber, position } =
        req.body
      const salt = bcrypt.genSaltSync(10)
      const passwrodHash = bcrypt.hashSync(password, salt)
      const role = 'company'
      const data = {
        idCompany: uuidv4(),
        email,
        password: passwrodHash,
        fullname,
        company,
        phonenumber,
        position,
        role
      }
      console.log(data)
      const { rowCount } = await authModel.FindEmail(email)
      if (rowCount) {
        return next(createError(403, 'user sudah terdaftar'))
      }
      await authModel.create(data)
      //   sendMail({ email, name, role })
      common.response(
        res,
        {
          id: uuidv4(),
          email,
          fullname,
          company,
          phonenumber,
          position,
          role
        },
        'Register Success',
        200
      )
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  profil: async (req, res, next) => {
    try {
      const email = req.decoded.email
      const {
        rows: [user]
      } = await authModel.FindEmail(email)
      const data = {
        name: user.fullname,
        email: user.email,
        phone_number: user.phonenumber,
        company: user.company,
        position: user.position
      }
      delete user.password
      // commonHellper.response(res, user, 'Uppsstt email sudah ada', 200)
      common.response(res, data, `anda berada di profil ${user.fullname}`, 200)
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  updateProfil: (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const idcompany = decoded.id
    console.log(idcompany)
    const {
      companyfield,
      address,
      companydescription,
      email,
      image,
      instagram,
      linkedin,
      phonenumber,
      company
    } =
      req.body
    const data = {
      companyfield,
      address,
      companydescription,
      email,
      image: `http://${req.get('host')}/img/${image}`,
      instagram,
      linkedin,
      phonenumber,
      company
    }
    console.log(data)
    authModel
      .updateProfil({ ...data, idcompany })
      .then(() => {
        common.response(res, data, 'data updated success', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.body.refreshToken
      const decoded = await jwt.verify(refreshToken, process.env.SECRET_KEY)
      console.log(decoded)
      const newPayload = {
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      }
      const newToken = await authHelper.generateToken(newPayload)
      const newRefreshToken = await authHelper.generateRefreshToken(newPayload)
      const result = {
        token: newToken,
        refreshToken: newRefreshToken
      }
      common.response(res, result, 'data berhasil di refresh', 200)
    } catch (error) {
      console.log(error)
      if (error && error.name === 'TokenExpiredError') {
        next(createError(400, 'token expired'))
      } else if (error && error.name === 'JsonWebTokenError') {
        next(createError(400, 'token invalid'))
      } else {
        next(createError(400, 'token not active'))
      }
    }
  },
  changePassword: (req, res, next) => {
    authModel
      .changePassword(req.body)
      .then(() => {
        res.json({
          message: 'Password berhasil diganti'
        })
      })
      .catch((_error) => {
        next(createError)
      })
  }
}

module.exports = {
  authCompany
}

// psql -U uqbvengweiiehg -h ec2-52-73-184-24.compute-1.amazonaws.com -p 5432 -d dt4ic1rabho76

// ALTER TABLE users
// ADD role AS enum ('admin','user');

// heroku log --tail
// pg_dump -U postgres -h 127.0.0.1 web2 > web2.pqsql
