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
      'SELECT employee.fullname,employee.email, employee.skill, employee.address,employee.description,portfolio.image,portfolio.nameapps,portfolio.respository,portfolio.type, work_experience.jobdescription,work_experience.monthyear,work_experience.namecompany,work_experience.position FROM employee INNER JOIN work_experience ON employee.idemployee = work_experience.idemployee INNER JOIN portfolio ON employee.idemployee = portfolio.idemployee WHERE employee.idemployee =$1',
      [idemployee],
      (err, result) => {
        if (!err) {
          resolve(result.rows)
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
