/* eslint-disable camelcase */
const pool = require('../config/db')
const bcrypt = require('bcryptjs')
const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM employee WHERE email = $1',
      [email],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const create = ({
  id_employee,
  fullname,
  email,
  phonenumber,
  password,
  role
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO employee(id_employee, fullname, email, phonenumber, password, role)VALUES($1, $2, $3, $4, $5, $6)',
      [id_employee, fullname, email, phonenumber, password, role],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const updateProfile = ({
  fullname,
  email,
  phonenumber,
  jobs,
  work_place,
  address,
  description,
  skill,
  image,
  active,
  role,
  updated_at,
  id_employee
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE employee SET fullname = COALESCE($1, fullname), email = COALESCE($2, email), phonenumber = COALESCE($3, phonenumber), jobs = COALESCE($4, jobs), work_place = COALESCE($5, work_place), address = COALESCE($6, address), description = COALESCE($7, description), skill = COALESCE($8, skill), image = COALESCE($9, image), active = COALESCE($10, active), role = COALESCE($11, role), updated_at = COALESCE($12, updated_at) WHERE id_employee = $13',
      [
        fullname,
        email,
        phonenumber,
        jobs,
        work_place,
        address,
        description,
        skill,
        image,
        active,
        role,
        updated_at,
        id_employee
      ],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}
const changePassword = (body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT email FROM employee WHERE id_employee = $1',
      [body.id_employee],
      (err, result) => {
        if (!result.rows[0]) {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              reject(err)
            }
            const { password, email } = body
            bcrypt.hash(password, salt, (_err, hashedPassword) => {
              if (_err) {
                reject(_err)
              }
              pool.query(
                'UPDATE employee SET password= $1 WHERE email = $2',
                [hashedPassword, email],
                (_err, result) => {
                  if (!_err) {
                    resolve({ msg: 'change password success' })
                  } else {
                    reject(_err)
                  }
                }
              )
            })
          })
        } else {
          reject(err)
        }
      }
    )
  })
}
module.exports = {
  findByEmail,
  create,
  updateProfile,
  changePassword
}
