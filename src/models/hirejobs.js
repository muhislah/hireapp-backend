const db = require('../config/db')

const hireJobModel = {
  insert: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO hirejobs (status, idEmployee,idcompany,hp,deskripsi,tujuan,email,fullname) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
        [
          data.status,
          data.idEmployee,
          data.idcompany,
          data.hp,
          data.deskripsi,
          data.tujuan,
          data.email,
          data.fullname
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
  },
  update: ({ status, idEmployee, idcompany, idhirejob }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE hirejobs SET status = $1,  idEmployee = $2,idcompany=$3 WHERE idhirejob=$4',
        [status, idEmployee, idcompany, idhirejob],
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
