const pool = require('../config/db')

const create = ({ position, name_company, month_year, job_description }) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO work_experience(position, name_company, month_year, job_description)VALUES($1, $2, $3, $4)', [position, name_company, month_year, job_description], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
  const update = ({ position, name_company, month_year, job_description, id_experience }) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE work_experience SET position = COALESCE($1, position), name_company = COALESCE($2, name_company), month_year = COALESCE($3, month_year), job_description = COALESCE($4, job_description) WHERE id_experience = $5', [position, name_company, month_year, job_description, id_experience], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

  const deleteExperience = (id_experience) => {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM work_experience WHERE id_experience = $1', [id_experience], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

  const search = ({sortby, search}) => {
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM work_experience WHERE ${sortby} ILIKE'%${search}%'` , (err, result) => {
            if(!err) {
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