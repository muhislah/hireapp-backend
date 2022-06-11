/* eslint-disable camelcase */
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const db = require('../config/db')

const authModel = {
  FindEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM company WHERE email = $1',
        [email],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  create: ({
    idCompany,
    fullname,
    password,
    email,
    company,
    phonenumber,
    position
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO company (idCompany, fullname, password, email,  company,phonenumber,position) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        [idCompany, fullname, password, email, company, phonenumber, position],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error('data error disini'))
          }
        }
      )
    })
  },
  activasi: ({ active = '1', email }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE users SET active = $1 where email = $2',
        [active, email],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error('data error disini'))
          }
        }
      )
    })
  },
  changePassword: (body) => {
    return new Promise((resolve, reject) => {
      const qs = 'SELECT email FROM company WHERE idCompany = $1'
      db.query(qs, [body.idCompany], (_err, data) => {
        console.log(data)
        if (!data.rows[0]) {
          bcrypt.genSalt(10, (_err, salt) => {
            if (_err) {
              reject(_err)
            }
            const { password, email } = body

            bcrypt.hash(password, salt, (err, hashedPassword) => {
              if (err) {
                reject(err)
              }
              const queryString =
                'UPDATE company SET password= $1 WHERE email = $2'
              db.query(queryString, [hashedPassword, email], (err, data) => {
                if (!err) {
                  resolve({ msg: 'change password success' })
                } else {
                  reject(err)
                }
              })
            })
          })
        } else {
          reject(_err)
        }
      })
    })
  }
}

module.exports = {
  authModel
}
