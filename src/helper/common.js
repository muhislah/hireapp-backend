const response = (res, result, status, message, pagination) => {
    const resultPrint = {}
    resultPrint.pagination = pagination
    resultPrint.status = 'success'
    resultPrint.statusCode = status
    resultPrint.data = result
    resultPrint.message = message || null
    res.status(status).json(resultPrint)
  }
  
  module.exports = {
    response
  }