const express = require('express');
const registerController = require('../controllers/auth/register.controller');
const router = express.Router();

router.post('/register',registerController.register)