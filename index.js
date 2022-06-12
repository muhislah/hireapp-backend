require('dotenv').config()
const express = require('express')

const mainRouter = require('./src/routes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())


app.use('/v1', mainRouter)


app.use((err, req, res, next) => {
  const messError = err.message || 'internal server error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messError
  })
})


app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`)
  })