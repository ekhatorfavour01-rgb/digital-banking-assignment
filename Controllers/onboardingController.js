const onboardingService= require('../Services/onboardingService');
const { success, error } = require('../Utils/response');

exports.createBvn = async (req, res, next) => {
    try {
        const { firstName, lastName, email, bvn, dob, phone } = req.body;

        if (!firstName || !lastName || !email || !bvn ||!dob ||!phone) {
            return error(res, 400, 'firstName,lastName, email, and bvn are required');
        }
        const { customer, nibssResult } = await  onboardingService.onboardWithBvn({ firstName, lastName, email, bvn, dob, phone });

        success(res, 201, { customer, token }, { nibss: nibssResult });
    }
    catch (err) {
        next(err);
    }
};


exports.createNin = async (req, res, next) => {
  try {
    const { firstName, lastName, email, dob, nin } = req.body;

    if (!firstName || !lastName || !nin ||!email ||!dob) {
      return error(res, 400, 'firstName, lastName, email, and nin are required');
    }

    const { customer, nibssResult } = await onboardingService.onboardWithNin({ firstName, lastName, email, dob, nin });

    success(res, 201, { customer, token }, { nibss: nibssResult });
  } catch (err) {
    next(err);
  }
};