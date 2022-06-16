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
  idemployee,
  fullname,
  email,
  phonenumber,
  password,
  role,
  active = 0
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO employee(idemployee, fullname, email, phonenumber, password, role, active)VALUES($1, $2, $3, $4, $5, $6,$7)',
      [idemployee, fullname, email, phonenumber, password, role, active],
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
      'SELECT employee.fullname,employee.email, employee.skill, employee.address,employee.description,portfolio.image,portfolio.nameapps,portfolio.respository,portfolio.type, work_experience.jobdescription,work_experience.monthyear,work_experience.namecompany,work_experience.position FROM employee INNER JOIN work_experience ON employee.idemployee = work_experience.idemployee INNER JOIN portfolio ON employee.idemployee = portfolio.idemployee WHERE employee.idemployee =$1',
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
const activasi = ({ active = '1', email }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE employee SET active = $1 where email = $2',
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
  idexperience, instagram, github,
  idemployee
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE employee SET fullname = COALESCE($1, fullname), email = COALESCE($2, email), phonenumber = COALESCE($3, phonenumber), jobs = COALESCE($4, jobs), workplace = COALESCE($5, workplace), address = COALESCE($6, address), description = COALESCE($7, description), skill = COALESCE($8, skill), image = COALESCE($9, image), active = COALESCE($10, active), role = COALESCE($11, role), idportfolio = COALESCE($12, idportfolio), idexperience = COALESCE($13, idexperience),instagram = COALESCE($14, instagram),github = COALESCE($15, github) WHERE idemployee = $16',
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
        instagram,
        github,
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
  getprofil,
  activasi
}
