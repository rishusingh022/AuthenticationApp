const controller = require('../controllers/auth');
const {validateRegister,validateLogin} = require('../middlewares/authValidator');
const router = require('express').Router();

router.post('/registerUser', validateRegister, controller.register);
router.post('/login', validateLogin ,controller.login);
router.post('/validateJwt', controller.validateJwt);

module.exports = router;