const jwt = require('jsonwebtoken')
const generateToken = (payload) => {
  const verify = {
    expiresIn: 60 * 5,
    issuer: 'belanja aja'
  }
  const token = jwt.sign(payload, process.env.SECRET_KEY, verify)
  return token
}
const generateRefreshToken = (payload) => {
  return new Promise((resolve, reject) => {
    const verify = {
      expiresIn: 60 * 60,
      issuer: 'hiring donk'
    }
    jwt.sign(payload, process.env.SECRET_KEY, verify, (err, token) => {
      if (!err) {
        resolve(token)
      } else {
        reject(err)
      }
    })
  })
}
module.exports = {
  generateToken,
  generateRefreshToken
}
