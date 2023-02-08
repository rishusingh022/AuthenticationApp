const db = require('../../database/models');
const { HTTPError } = require('../utils/errorHandler');
const {encryptPassword} = require('../utils/encryptPassword');

const register = async (user) => {
  try {
    const { username, firstName, lastName, emailId, password } = user;
    const encrptedPasswordRes = await encryptPassword(password);
    const newUser = await db.Users.create({
      username,
      firstName,
      lastName,
      emailId,
      password: encrptedPasswordRes,
    }); 
    return newUser;
  } catch (error) {
    throw new HTTPError(error.message, 500);
  }
};
const login = async (username, password) => {
  try {
    const userRes = await db.Users.findOne({
      where: {
        username : username,
      },
    });
    if (!userRes) {
      throw new HTTPError('User not found', 404);
    }
    const hashPassword = await encryptPassword(password);
    if (hashPassword!==userRes.password) {
      throw new HTTPError('Invalid password', 401);
    }
    return userRes;
  } catch (error) {
    throw new HTTPError(error.message, 500);
  }
};
module.exports = {
  register,
  login,
};

