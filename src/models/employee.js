/* eslint-disable camelcase */
const pool = require('../config/db')

const selectEmployee = ({ sortby, limit, offset, search, sort }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM employee WHERE ${sortby} ILIKE'%${search}%' ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`,
      [limit, offset],
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

const selectDetailEmployee = (id_employee) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT employee.*, work_experience FROM employee INNER JOIN work_experience ON employee.id_experience = id_experience WHERE employee.id_employee = $1 ',
      [id_employee],
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
