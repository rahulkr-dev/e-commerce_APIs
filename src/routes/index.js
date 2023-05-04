const express = require('express');
const registerController = require('../controllers/auth/register.controller');
const loginController = require('../controllers/auth/login.controller');
const auth = require('../middlewares/auth');
const userController = require('../controllers/auth/user.controller');
const refreshTokenController = require('../controllers/auth/refreshToken.controller')
const router = express.Router();

router.post('/register',registerController.register);
router.post('/login',loginController.login);
router.get('/me',auth,userController.me);
router.post('/refresh_token',refreshTokenController.refreshToken)

module.exports = router;