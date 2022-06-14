const employeeModel = require('../models/employee')
const commonHelper = require('../helper/common')

exports.getEmploye = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 6
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit

    const sortby = req.query.sortby || 'fullname'
    const sort = req.query.sort || 'asc'
    const search = req.query.search || ''

    const { rows: employee } = await employeeModel.selectEmployee({
      limit,
      offset,
      sortby,
      search,
      sort
    })
    // console.log(employee);

    const {
      rows: [count]
    } = await employeeModel.countEmployee()
    const totalData = parseInt(count.total)
    const totalPage = Math.ceil(totalData / limit)

    const pagination = {
      currentPage: page,
      limit,
      totalData,
      totalPage
    }

    commonHelper.response(res, employee, 'get data success', 200, pagination)
  } catch (error) {
    console.log(error)
  }
}

exports.getDetailEmployee = async (req, res, next) => {
  try {
    const idemployee = req.params.idemployee
    const {
      rows: [result]
    } = await employeeModel.selectDetailEmployee(idemployee)
    // console.log(result);
    delete result.password

    commonHelper.response(res, result, 'Get detail data success', 200)
  } catch (error) {
    console.log(error)
  }
}
