const { portfolioModel } = require('../models/portfolio')
const createError = require('http-errors')
const common = require('../helper/common')
const cloudinary = require('../helper/cloudinary')

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
      // const gambar = req.files.map((file) => {
      //   return `http://${req.get('host')}/img/${file.filename}`
      // })
      // const gambar = req.files.map((file) => {
      //   return file.path
      // })
      // const gambararray = toString(gambar)
      // console.log(gambararray)
      // console.log(gambar)
      // const pictureFiles = req.files
      // const multiplePicturePromise = pictureFiles.map((picture) =>
      //   cloudinary.uploader.upload(picture.path)
      // )
      // const imageResponses = await Promise.all(multiplePicturePromise)
      // console.log(...imageResponses.url)
      // const uploder = async (path) => await cloudinary.uploads(path, 'Image')
      // const uploder = await cloudinary.uploader.upload(req.files.filename)
      const gambars = req.files[0].path
      const ress = await cloudinary.uploader.upload(gambars)
      console.log(ress)
      // const urls = []
      // const files = req.files
      // for (const file of files) {
      //   const { path } = file
      //   const newPath = await ress(path)
      //   urls.push(newPath)
      //   fs.unlinkSync(path)
      // }
      const urls = []
      const files = req.files
      for (const file of files) {
        const { path } = file
        const newPath = await cloudinaryImageUploadMethod(path)
        urls.push(newPath)
      }
      // console.log(urls.map((url) => url.res))
      // const images = await cloudinary.uploader.upload(req.files.filename)
      // // console.log(images)
      // console.log(req.files.filename)
      const { nameApps, respository, type, idEmployee } = req.body
      const data = {
        nameApps,
        respository,
        type,
        image: urls.map((url) => url.res),
        idEmployee
      }
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
      const { nameApps, respository, type, idEmployee } = req.body
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
