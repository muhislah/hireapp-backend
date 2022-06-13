const db = require('../config/db')

const hireJobModel = {
  insert: (body) => {
    const { status, idEmployee } = body
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO hirejobs (status, idEmployee) VALUES ($1,$2)',
        [status, idEmployee],
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
  update: ({ status, idEmployee, idhirejob }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE hirejobs SET status = $1,  idEmployee = $2 WHERE idhirejob=$3',
        [status, idEmployee, idhirejob],
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
  deleteHire: (idhirejob) => {
    return db.query('DELETE FROM hirejobs WHERE idhirejob = $1', [idhirejob])
  }
}

module.exports = {
  hireJobModel
}
