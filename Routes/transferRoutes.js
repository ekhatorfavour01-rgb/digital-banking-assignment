const express = require('express');
const router = express.Router();
const transferController = require('../Controllers/transferController');
const auth = require('../Middleware/authMiddleware');



router.get('/name-enquiry', auth, transferController.nameEnquiry);


router.post('/', auth, transferController.transfer);


module.exports = router;
