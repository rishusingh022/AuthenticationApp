const db = require('../../database/models');
const { HTTPError } = require('../utils/errorHandler');
const {encryptPassword} = require('../utils/encryptPassword');
const jwt = require('jsonwebtoken');
const {getRediwClient} = require('../utils/redis');

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
    const redisClient = await getRediwClient();
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
    const token = jwt.sign(userRes.dataValues,'secret');
    
    await redisClient.set(token , '1');

    return {...userRes.dataValues,token};
  } catch (error) {
    throw new HTTPError(error.message, 500);
  }
};
const validateJwt = async (token) => {
  const redisClient = await getRediwClient();
  const userName = await redisClient.get(token);
  console.log({userName});
  if(!userName){
    return {
      message : 'Invalid token',
    };
  }
  const decodedToken = jwt.verify(token, 'secret');
  const userRes = await db.Users.findOne({
    where: {
      username : decodedToken.username,
    },
  });
  if(!userRes){
    return {
      message : 'User not found',
    };
  }
  return {
    message : 'Valid token',
    data : userRes.username
  };
};
module.exports = {
  register,
  login,
  validateJwt,
};

