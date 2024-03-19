const express = require('express');

const premiumController = require('../controllers/premium');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/showLeaderboard', userAuthentication.authenticate , premiumController.showLeaderboard);


module.exports = router;