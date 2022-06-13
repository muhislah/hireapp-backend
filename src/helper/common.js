// const createHttpError = require('http-errors')
const response = (res, result, message, status, pagination) => {
  const resultRespon = {}
  resultRespon.status = 'success'
  resultRespon.statusCode = status || 200
  resultRespon.message = message || null
  resultRespon.data = result
  if (pagination) resultRespon.pagination = pagination
  res.status(status).json(resultRespon)
}

const responnotdata = (req, res, data) => {
  // const id = req.params.id
  console.log(data === undefined)
  if (data === undefined) {
    res.json({
      msg: 'data not found'
    })
    // next(createHttpError(400, 'token invalid'))
  }
}

module.exports = {
  response,
  responnotdata
}
