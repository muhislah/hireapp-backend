const pool = require('../config/db')

const create = ({
  position,
  namecompany,
  monthyear,
  jobdescription,
  idemployee
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO work_experience(position, namecompany, monthyear, jobdescription,idemployee)VALUES($1, $2, $3, $4,$5)',
      [position, namecompany, monthyear, jobdescription, idemployee],
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
const update = ({
  position,
  namecompany,
  monthyear,
  jobdescription,
  idexperience,
  idemployee
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE work_experience SET position = COALESCE($1, position), namecompany = COALESCE($2, namecompany), monthyear = COALESCE($3, monthyear), jobdescription = COALESCE($4, jobdescription),idemployee = COALESCE($5, idemployee) WHERE idexperience = $6',
      [
        position,
        namecompany,
        monthyear,
        jobdescription,
        idexperience,
        idemployee
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
}

const deleteExperience = (idexperience) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM work_experience WHERE idexperience = $1', [idexperience], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

const search = ({ sortby, search }) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM work_experience WHERE ${sortby} ILIKE'%${search}%'`, (err, result) => {
      if (!err) {
        resolve(result.rows)
      } else {
        reject(new Error(err))
      }
    })
  })
}
module.exports = {
  create,
  update,
  deleteExperience,
  search
}
