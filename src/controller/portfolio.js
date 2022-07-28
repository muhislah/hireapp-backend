const { portfolioModel } = require('../models/portfolio')
const createError = require('http-errors')
const common = require('../helper/common')
const cloudinary = require('../helper/cloudinary')
const jwt = require('jsonwebtoken')

const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send('upload image error')
      resolve({
        res: res.secure_url
      })
    })
  })
}

const portfolioController = {
  getPortfolio: (req, res, next) => {
    portfolioModel
      .getPortfolio()
      .then((result) => {
        common.response(res, result, 'get data portfolio', 200)
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  },
  CreatePortfolio: async (req, res, next) => {
    try {
      // const gambars = req.files[0].path
      // const ress = await cloudinary.uploader.upload(gambars)
      // console.log(ress)
      const urls = []
      const files = req.files
      for (const file of files) {
        const { path } = file
        const newPath = await cloudinaryImageUploadMethod(path)
        urls.push(newPath)
      }
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const idEmployee = decoded.id
      const { nameApps, respository, type } = req.body
      const data = {
        nameApps,
        respository,
        type,
        image: urls.map((url) => url.res),
        idEmployee
      }
      console.log(data)
      // console.log(cloudinary.uploader.upload(data.image))
      portfolioModel.insert({ ...data }).then(() => {
        common.response(res, data, 'data success create', 200)
      })
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  updatePortoflio: async (req, res, next) => {
    try {
      // const gambar = req.files.map((file) => {
      //   return `http://${req.get('host')}/img/${file.filename}`
      // })
      const urls = []
      const files = req.files
      for (const file of files) {
        const { path } = file
        const newPath = await cloudinaryImageUploadMethod(path)
        urls.push(newPath)
      }
      const { nameApps, respository, type } = req.body
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const idEmployee = decoded.id
      const data = {
        nameApps,
        respository,
        type,
        image: urls.map((url) => url.res),
        idEmployee
      }
      // eslint-disable-next-line camelcase
      const idPortfolio = req.params.id
      portfolioModel
        .update(data, idPortfolio)
        .then(() => {
          common.response(res, data, 'data updated success', 200)
        })
        .catch((error) => {
          console.log(error)
          next(createError)
        })
    } catch (error) {
      console.log(error)
      next(createError)
    }
  },
  deletePortfolio: (req, res, next) => {
    const idPortfolio = req.params.id
    // const name = req.body.name
    portfolioModel
      .deletePortfolio(idPortfolio)
      .then(() => {
        res.status(200).json({
          message: 'deleted success',
          data: `idPortfolio : ${idPortfolio}`
        })
      })
      .catch((error) => {
        console.log(error)
        next(createError)
      })
  }
}

module.exports = {
  portfolioController
}
