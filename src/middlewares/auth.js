const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const protect = (req, res, next) => {
  try {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.SECRET_KEY, {
        issuer: 'hiring donk'
      })
      // console.log(decoded)
      req.decoded = decoded
      next()
    } else {
      // console.log(error)
      next(createError(400, 'server need token'))
    }
  } catch (error) {
    console.log(error.name)

    if (error && error.name === 'JsonWebTokenError') {
      next(createError(400, 'token invalid'))
    } else if (error && error.name === 'TokenExpiredError') {
      next(createError(400, 'token expaired'))
    } else {
      next(createError(400, 'token not active'))
    }
    //   next(createHttpError)
  }
}
const isAdmin = (req, res, next) => {
  if (req.decoded.role !== 'admin') {
    return next(createError(400, 'admin only'))
  }
  next()
}
const isUsers = (req, res, next) => {
  if (req.decoded.role !== 'user') {
    return next(createError(400, 'user only'))
  }
  next()
}

module.exports = {
  protect,
  isAdmin,
  isUsers
}
