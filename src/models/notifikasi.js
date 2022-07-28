const db = require('../config/db')

const notifikasiModel = {
  //   getNotif: (idEmployee) => {
  //     return db.query(
  //       'SELECT * FROM hirejobs INNER JOIN employee ON hirejobs.idEmployee = employee.id_employee where idEmployee = $1',
  //       [idEmployee]
  //     )
  //   }
  getNotif: (idcompany) => {
    return db.query('SELECT * FROM hirejobs WHERE idcompany = $1', [idcompany])
  }
}

module.exports = {
  notifikasiModel
}
