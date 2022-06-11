const employeeModel = require('../models/employee')

exports.getEmploye = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const sortby = req.query.sortby || 'id'
    const sort = req.query.sort || ''

    const search = req.query.search || ''

    const result = await employeeModel.selectEmployee({limit, offset, sortby, sort, search})


  } catch (error) {
      console.log(error);
  }
};
