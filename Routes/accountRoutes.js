const express = require('express');
const router = express.Router();
const accountController = require('../Controllers/accountController');
const auth = require('../Middleware/authMiddleware');

router.post('/create', auth, accountController.createAccount);
router.get('/balance', auth, accountController.getBalance);

module.exports= router;


