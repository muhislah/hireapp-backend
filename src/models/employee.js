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

const selectDetailEmployee = (idemployee) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM employee WHERE idemployee = $1',
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
