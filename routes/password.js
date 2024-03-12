const express = require('express');

const passwordController = require('../controllers/password');
//const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.post('/forgotPassword', passwordController.forgotPassword);


module.exports = router;