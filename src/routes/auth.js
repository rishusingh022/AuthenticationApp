const controller = require('../controllers/auth');

const router = require('express').Router();

router.post('/registerUser', controller.register);
router.post('/login', controller.login);
router.post('/validateJwt', controller.validateJwt);

module.exports = router;