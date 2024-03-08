const express = require('express');


const userController = require('../controllers/user');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/getUser', userAuthentication.authenticate, userController.getUser)


module.exports = router;