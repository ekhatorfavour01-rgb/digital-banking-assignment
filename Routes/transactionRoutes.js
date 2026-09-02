const express = require('express');
const router = express.Router();
const transactionController = require('../Controllers/transactionController');
const auth = require('../Middleware/authMiddleware');


router.get('/', auth, transactionController.getMyTransactions);
router.get('/status/:reference', auth, transactionController.checkStatus);


module.exports = router;
