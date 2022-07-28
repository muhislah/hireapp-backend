const db = require('../config/db')

const notifikasiModel = {
  //   getNotif: (idEmployee) => {
  //     return db.query(
  //       'SELECT * FROM hirejobs INNER JOIN employee ON hirejobs.idEmployee = employee.id_employee where idEmployee = $1',
  //       [idEmployee]
  //     )
  //   }
  getNotif: (idemployee) => {
    return db.query(
      'SELECT * FROM hirejobs INNER JOIN employee ON hirejobs.idEmployee = employee.idemployee INNER JOIN company ON hirejobs.idcompany = company.idcompany where employee.idemployee = $1 OR idcompany = $2',
      [idemployee]
    )
  },
  getNotifCompany: (idcompany) => {
    return db.query(
      'SELECT * FROM hirejobs INNER JOIN employee ON hirejobs.idEmployee = employee.idemployee INNER JOIN company ON hirejobs.idcompany = company.idCompany where company.idCompany = $1',
      [idcompany]
    )
  }
}

module.exports = {
  notifikasiModel
}
