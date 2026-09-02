const express = require('express');
const router = express.Router();
const onboardingController = require('../Controllers/onboardingController');



router.post('/bvn', onboardingController.createBvn);
router.post('/nin', onboardingController.createNin);


module.exports = router;
