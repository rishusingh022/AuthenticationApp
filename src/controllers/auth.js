const authServices = require('../services/auth');
const {HTTPError} = require('../utils/errorHandler');
const register = async (req, res) => {
  try{
    const result = await authServices.register(req.body);
    res.status(201).json(result);
  }
  catch(error){
    if(error instanceof HTTPError){
      res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({
      message : 'Something went wrong',
    });
  }
};

const login = async (req, res) => {
  try{
    const { username, password } = req.body;
    const result = await authServices.login(username, password);
    res.status(200).json(result);
  }
  catch (error) {
    if(error instanceof HTTPError){
      res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({
      message : 'Something went wrong',
    });
  }
};

const validateJwt = async (req, res) => {
  try{
    const { token } = req.body;
    const result = await authServices.validateJwt(token);
    res.status(200).json(result);
  }
  catch(error){
    if(error instanceof HTTPError){
      res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({
      message : 'Something went wrong',
    });
  }
};

module.exports = {
  register,
  login,
  validateJwt,
};