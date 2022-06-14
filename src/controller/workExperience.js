const commonHelper = require('../helper/common')
const workExperienceModel = require('../models/workExperience')

exports.createWorkExperience = async (req, res, next) => {
    try {
        const { position, name_company, month_year, job_description } = req.body
        const data = {
            position,
            name_company,
            month_year,
            job_description
        }
        await workExperienceModel.create(data)
        commonHelper.response(res, data, 201, 'create data success')

      } catch (error) {
        console.log(error)
      }
}
exports.updateWorkExperience = async (req, res, next) => {
    try {
      const id_experience = req.params.id_experience
      const { position, name_company, month_year, job_description} = req.body
        const data = {
            id_experience,
            position,
            name_company,
            month_year,
            job_description,
        }
        await workExperienceModel.update(data)
        commonHelper.response(res, data, 200, 'update data success')
    } catch (error) {
      console.log(error);
    }
  }

  exports.deleteWorkExperience = async (req, res, next) => {
    try {
      const id_experience = req.params.id_experience
      await workExperienceModel.deleteExperience(id_experience)
  
      commonHelper.response(res, id_experience, 200, 'Delete data success')
    } catch (error) {
      console.log(error);
    }
  }

  exports.searchWorkExperience = async (req, res, next) => {
    try {
      const sortby = req.query.sortby || "name_company";
      const search = req.query.search || "";

     const result = await workExperienceModel.search({sortby, search})
  
      commonHelper.response(res, result, 200, 'get data success')
    } catch (error) {
        console.log(error);
    }
  };