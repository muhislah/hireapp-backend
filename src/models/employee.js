const pool = require('../config/db')

const selectEmployee = ({ type, limit, offset, search }) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM employee WHERE ${type} ILIKE'%${search}%' LIMIT $1 OFFSET $2`, [limit, offset], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const selectDetailEmployee = (id_employee) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM employee WHERE id_employee = $1', [id_employee], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

  const countEmployee = () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT COUNT(*) AS total FROM employee', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

module.exports = {
  selectEmployee,
  countEmployee,
  selectDetailEmployee
}