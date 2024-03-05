const express = require('express');

const signupController = require('../controllers/login');

const router = express.Router();

router.post('/login', signupController.login);


module.exports = router;