const db = require('../config/db')

const notifikasiModel = {
  //   getNotif: (idEmployee) => {
  //     return db.query(
  //       'SELECT * FROM hirejobs INNER JOIN employee ON hirejobs.idEmployee = employee.id_employee where idEmployee = $1',
  //       [idEmployee]
  //     )
  //   }
  getNotif: () => {
    return db.query(
      'SELECT hirejobs.status,employee.fullname,employee.address,employee.skill,employee.image FROM hirejobs INNER JOIN employee ON hirejobs.idEmployee = employee.idemployee'
    )
  }
}

module.exports = {
  notifikasiModel
}
