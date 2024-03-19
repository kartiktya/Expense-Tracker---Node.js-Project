const express = require('express');


const userController = require('../controllers/user');
const userAuthentication = require('../middleware/auth');
const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/getUser', userAuthentication.authenticate, userController.getUser);
router.get('/downloadExpense', userAuthentication.authenticate, expenseController.downloadExpense);
router.get('/viewExpenseFilesDownloaded', userAuthentication.authenticate, expenseController.viewExpenseFilesDownloaded);


module.exports = router;