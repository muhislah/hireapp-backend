const pool = require('../config/db')

exports.selectEmployee = ({ limit, offset, sortby, sort, search }) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM pekerja WHERE name ILIKE'%${search}%' ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`, [limit, offset], (err, result) => {
        if (!err) {
          resolve(result.rows)
        } else {
          reject(new Error(err))
        }
      })
    })
  }