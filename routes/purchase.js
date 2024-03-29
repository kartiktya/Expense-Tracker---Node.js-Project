const express = require('express');

const purchaseController = require('../controllers/purchase');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/premiumMembership', userAuthentication.authenticate , purchaseController.purchasePremium);
router.post('/updateTransactionStatus', userAuthentication.authenticate , purchaseController.updateTransactionStatus);
router.post('/updateFailedTransactionStatus', userAuthentication.authenticate , purchaseController.updateFailedTransactionStatus);


module.exports = router;