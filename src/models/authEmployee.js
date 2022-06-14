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

const create = ({ idemployee, fullname, email, phonenumber, password, role }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO employee(idemployee, fullname, email, phonenumber, password, role)VALUES($1, $2, $3, $4, $5, $6)',
      [idemployee, fullname, email, phonenumber, password, role],
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
  workplace,
  address,
  description,
  skill,
  image,
  active,
  role,
  idemployee
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE employee SET fullname = COALESCE($1, fullname), email = COALESCE($2, email), phonenumber = COALESCE($3, phonenumber), jobs = COALESCE($4, jobs), workplace = COALESCE($5, workplace), address = COALESCE($6, address), description = COALESCE($7, description), skill = COALESCE($8, skill), image = COALESCE($9, image), active = COALESCE($10, active), role = COALESCE($11, role) WHERE idemployee = $12',
      [
        fullname,
        email,
        phonenumber,
        jobs,
        workplace,
        address,
        description,
        skill,
        image,
        active,
        role,
        idemployee
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
    pool.query('SELECT email FROM employee WHERE idemployee = $1', [body.idemployee], (err, result) => {
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
            pool.query('UPDATE employee SET password= $1 WHERE email = $2', [hashedPassword, email], (_err, result) => {
              if (!_err) {
                resolve({ msg: 'change password success' })
              } else {
                reject(_err)
              }
            })
          })
        })
      } else {
        reject(err)
      }
    })
  })
}
module.exports = {
  findByEmail,
  create,
  updateProfile,
  changePassword
}
