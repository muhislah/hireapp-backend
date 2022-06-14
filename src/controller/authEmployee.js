const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken')
const createError = require("http-errors");
const { findByEmail, create, updateProfile, changePassword } = require("../models/authEmployee");
const commonHelper = require("../helper/common");
const authHelper = require('../helper/authEmployee')

const register = async (req, res, next) => {
  try {
    const { fullname, email, phonenumber, password } = req.body;
    const { rowCount } = await findByEmail(email);

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    if (rowCount) {
      return next(createError(403, "user sudah terdaftar"));
    }
    const data = {
      id_employee: uuidv4(),
      fullname,
      email,
      phonenumber,
      password: passwordHash,
      role: 'employee'
    };
    await create(data);
    commonHelper.response(res, null, 201, "User berhasil register");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const {
      rows: [user],
    } = await findByEmail(email);
    console.log(user);

    if (!user) {
      return commonHelper.response(
        res,
        null,
        403,
        "email atau password anda salah"
      );
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return commonHelper.response(
        res,
        null,
        403,
        "email atau password anda salah"
      );
    }
    delete user.password;

    const payload = {
      fullname: user.fullname,
      email: user.email,
    };

    user.token = authHelper.generateToken(payload)
    user.refreshToken = authHelper.generateRefreshToken(payload)

    return commonHelper.response(res, user, 201, "anda berhasil login");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken
  const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT2)
  const payload = {
    email: decoded.email,
    role: decoded.role
  }
  const result = {
    token: authHelper.generateToken(payload),
    refreshToken: authHelper.generateRefreshToken(payload)
  }
  commonHelper.response(res, result, 200)
}

const updateProfileEmployee = async (req, res, next) => {
  try {
    const id_employee = req.params.id_employee
    const { fullname, email, phonenumber, jobs, work_place, address, description, skill, active } = req.body;
    const updated_at = new Date()
    const data = {
      id_employee,
      fullname,
      email,
      phonenumber,
      jobs,
      work_place,
      address,
      description,
      skill,
      image: `http://${req.get("host")}/img/${req.file.filename}`,
      active,
      role: 'employee',
      updated_at
    };
    await updateProfile(data);
    commonHelper.response(res, data, 201, "update user success");
  } catch (error) {
    console.log(error);
  }
};

const changePasswordEmployee = (req, res, next) => {
  changePassword(req.body)
  .then(()=>{
    res.json({
      message: 'password has been changed'
    })
  }) 
  .catch((err)=>{
    console.log(err);
  })
}
module.exports = {
  register,
  login,
  refreshToken,
  updateProfileEmployee,
  changePasswordEmployee
};
