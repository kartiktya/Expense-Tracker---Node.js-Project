const express = require('express');

const passwordController = require('../controllers/password');
//const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.post('/forgotPassword', passwordController.forgotPassword);
router.get('/resetPassword/:id', passwordController.resetPassword);
router.get('/updatePassword/:id', passwordController.updatePassword);


module.exports = router;