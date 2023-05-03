const express = require('express');
const registerController = require('../controllers/auth/register.controller');
const loginController = require('../controllers/auth/login.controller');
const router = express.Router();

router.post('/register',registerController.register);
router.post('/login',loginController.login);

module.exports = router;