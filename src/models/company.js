const db = require('../config/db')

const modelCompany = {
  select: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM company', (err, result) => {
        if (!err) {
          resolve(result.rows)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  filterCompany: ({
    search,
    sort = 'fullname',
    type = 'ASC',
    limit,
    offset
  }) => {
    return db.query(
      `SELECT * FROM company WHERE ${sort} ILIKE $1 ORDER BY ${sort} ${type} LIMIT $2 OFFSET $3`,
      ['%' + search + '%', limit, offset]
    )
  },
  countCompany: () => {
    return db.query('SELECT COUNT(*) AS total FROM company')
  },
  CompanyByEmployee: () => {
    return db.query(
      ' SELECT * FROM company INNER JOIN employee ON company.idemployee = employee.idemployee'
    )
  },
  getDetailCompany: (idcompany) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM company WHERE idcompany = $1',
        [idcompany],
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
}

module.exports = {
  modelCompany
}
