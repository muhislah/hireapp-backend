require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const CreateError = require('http-errors')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const Router = require('./src/routes/index')

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
// app.use(helmet())
helmet({
  crossOriginResourcePolicy: false
})
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://peworld.netlify.app']
  })
)
app.use(xss())
app.disable('x-powered-by')

app.use('/', Router)
app.use('/img', express.static(path.join(__dirname, './public/images')))

const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
  console.log(`example app listening at http://localhost:${PORT}`)
})
app.all('*', (req, res, next) => {
  next(new CreateError.NotFound())
})

app.use((err, req, res, next) => {
  const messError = err.message || 'internal server error'
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message: messError
  })
})
