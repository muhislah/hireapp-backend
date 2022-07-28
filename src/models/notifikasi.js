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
      'SELECT employee.idemployee, employee.fullname, hirejobs.idhirejob, employee.description,employee.skill,employee.jobs,employee.address,employee.image AS imageEmployee FROM hirejobs INNER JOIN employee ON hirejobs.idemployee = employee.idemployee where employee.idemployee = $1',
      [idemployee]
    )
  },
  getNotifCompany: (idcompany) => {
    return db.query(
      'SELECT * FROM hirejobs INNER JOIN company ON hirejobs.idcompany = company.idcompany WHERE company.idCompany = $1',
      [idcompany]
    )
  }
}

module.exports = {
  notifikasiModel
}
