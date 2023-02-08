const Joi = require('joi');
const registerSchema = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  emailId: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const jwtSchema = Joi.object({
  token: Joi.string().required(),
  secret : Joi.string().required()
});


const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const validateJwt = (req, res, next) => {
  const { error } = jwtSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};
module.exports = {
  validateRegister,
  validateLogin,
  validateJwt,
};
