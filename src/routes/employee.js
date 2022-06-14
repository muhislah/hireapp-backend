const express = require('express')
const router = express.Router()
const { getEmploye, getDetailEmployee } = require('../controller/employee')
// const { protect } = require("../middlewares/authEmployee");

router
  .get('/', getEmploye)
  .get('/:idemployee', getDetailEmployee)
module.exports = router
