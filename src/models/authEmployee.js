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
const getprofil = (idemployee) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT employee.fullname,employee.email, employee.skill, employee.address,employee.description,portfolio.image,portfolio.nameapps,portfolio.respository,portfolio.type, work_experience.jobdescription,work_experience.monthyear,work_experience.namecompany,work_experience.position FROM employee INNER JOIN work_experience ON employee.idexperience = work_experience.idexperience INNER JOIN portfolio ON employee.idportfolio = portfolio.idportfolio WHERE employee.idemployee =$1',
      [idemployee],
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
  idportfolio,
  idexperience,
  idemployee
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE employee SET fullname = COALESCE($1, fullname), email = COALESCE($2, email), phonenumber = COALESCE($3, phonenumber), jobs = COALESCE($4, jobs), workplace = COALESCE($5, workplace), address = COALESCE($6, address), description = COALESCE($7, description), skill = COALESCE($8, skill), image = COALESCE($9, image), active = COALESCE($10, active), role = COALESCE($11, role), idportfolio = COALESCE($12, idportfolio), idexperience = COALESCE($13, idexperience) WHERE idemployee = $14',
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
        idportfolio,
        idexperience,
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
  changePassword,
  getprofil
}
