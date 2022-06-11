require('dotenv').config()
const express = require('express')

const mainRouter = require('./src/routes')

const app = express()
const PORT = process.env.PORT || 5000


app.use('/v1', mainRouter)


app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`)
  })