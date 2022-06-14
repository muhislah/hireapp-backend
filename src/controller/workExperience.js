const commonHelper = require('../helper/common')
const workExperienceModel = require('../models/workExperience')
const createError = require('http-errors')
exports.createWorkExperience = async (req, res, next) => {
  try {
    const { position, namecompany, monthyear, jobdescription } = req.body
    const data = {
      position,
      namecompany,
      monthyear,
      jobdescription
    }
    await workExperienceModel.create(data)
    commonHelper.response(res, data, 'create data success', 201)
  } catch (error) {
    console.log(error)
    next(createError)
  }
}
exports.updateWorkExperience = async (req, res, next) => {
  try {
    const idexperience = req.params.idexperience
    console.log(idexperience)
    const { position, namecompany, monthyear, jobdescription } = req.body
    const data = {
      idexperience,
      position,
      namecompany,
      monthyear,
      jobdescription
    }
    await workExperienceModel.update({ ...data, idexperience })
    console.log(data)
    commonHelper.response(res, data, 'update data success', 200)
  } catch (error) {
    console.log(error)
    next(createError)
  }
}

exports.deleteWorkExperience = async (req, res, next) => {
  try {
    const idexperience = req.params.idexperience
    await workExperienceModel.deleteExperience(idexperience)

    commonHelper.response(res, idexperience, 'Delete data success', 200)
  } catch (error) {
    console.log(error)
  }
}

exports.searchWorkExperience = async (req, res, next) => {
  try {
    const sortby = req.query.sortby || 'namecompany'
    const search = req.query.search || ''

    const result = await workExperienceModel.search({ sortby, search })

    commonHelper.response(res, result, 'get data success', 200)
  } catch (error) {
    console.log(error)
  }
}
