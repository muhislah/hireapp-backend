const db = require('../config/db')

const portfolioModel = {
  getPortfolio: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM portfolio', (err, result) => {
        if (!err) {
          resolve(result.rows)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  insert: (body) => {
    const { nameApps, respository, type, image = [], idEmployee } = body
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO portfolio (nameApps, respository, type, image, idEmployee) VALUES ($1,$2,$3,$4,$5)',
        [nameApps, respository, type, image, idEmployee],
        (err, result) => {
          if (!err) {
            resolve(result.rows)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  update: ({ nameApps, respository, type, image, idEmployee, idPortfolio }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE portfolio SET nameApps = $1,  respository = $2, type = $3, image = $4, idEmployee = $5 WHERE idPortfolio=$6',
        [nameApps, respository, type, image, idEmployee, idPortfolio],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  deletePortfolio: (idPortfolio) => {
    return db.query('DELETE FROM portfolio WHERE idPortfolio = $1', [
      idPortfolio
    ])
  }
}

module.exports = {
  portfolioModel
}
