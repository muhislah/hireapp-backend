const express = require('express')
const router = express.Router()
const {
  getEmploye,
  getDetailEmployee
  // getHomeEmployee
} = require('../controller/employee')
// const { protect } = require("../middlewares/authEmployee");

router
  .get('/', getEmploye)
  .get('/home', getEmploye)
  .get('/:idemployee', getDetailEmployee)
module.exports = router
