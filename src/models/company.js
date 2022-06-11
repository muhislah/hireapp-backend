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
  }
}

module.exports = {
  modelCompany
}
