const authServices = require('../services/auth');
const {HTTPError} = require('../utils/errorHandler');
const register = async (req, res) => {
  try{
    const result = await authServices.register(req.body);
    res.status(201).json(result);
  }
  catch(error){
    if(error instanceof HTTPError){
      res.status(error.status).json(error);
    }
    const err = new HTTPError('Something went wrong', 500);
    res.status(err.status).json(err);
  }
};

const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const result = await authServices.login(email, password);
    res.status(result.status).json(result);
  }
  catch (error) {
    if(error instanceof HTTPError){
      res.status(error.status).json(error);
    }
    const err = new HTTPError('Something went wrong', 500);
    res.status(err.status).json(err);
  }
};

const validateJwt = async (req, res) => {
  try{
    const { token } = req.body;
    const result = await authServices.validateJwt(token);
    res.status(result.status).json(result);
  }
  catch(error){
    if(error instanceof HTTPError){
      res.status(error.status).json(error);
    }
    const err = new HTTPError('Something went wrong', 500);
    res.status(err.status).json(err);
  }
};

module.exports = {
  register,
  login,
  validateJwt,
};