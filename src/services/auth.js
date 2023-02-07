const db = require('../../database/models');
const { HTTPError } = require('../utils/errorHandler');
const {encrptedPassword} = require('../utils/encryptPassword');
const register = async (user) => {
  try {
    const { username, firstName, lastName, emailId, password } = user;
    const encrptedPasswordRes = await encrptedPassword(password);
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
module.exports = {
  register,
};