const pool = require("../config/db");
const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM employee WHERE email = $1",
      [email],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const create = ({ id_employee, fullname, email, phonenumber, password }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO employee(id_employee, fullname, email, phonenumber, password)VALUES($1, $2, $3, $4, $5)",
      [id_employee, fullname, email, phonenumber, password],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const updateProfile = ({
  fullname,
  email,
  phonenumber,
  jobs,
  work_place,
  address,
  description,
  skill,
  image,
  active,
  updated_at,
  id_employee
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE employee SET fullname = $1, email = $2, phonenumber = $3, jobs = $4, work_place = $5, address = $6, description = $7, skill = $8, image = $9, active = $10, updated_at = $11 WHERE id_employee = $12",
      [
        fullname,
        email,
        phonenumber,
        jobs,
        work_place,
        address,
        description,
        skill,
        image,
        active,
        updated_at,
        id_employee
      ],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};
module.exports = {
  findByEmail,
  create,
  updateProfile
};
