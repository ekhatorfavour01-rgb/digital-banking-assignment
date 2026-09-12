const accountService = require('../Services/accountService');
const { success, error } = require('../Utils/response');


exports.createAccount = async (req, res, next) => {
   const { KycType, KycID, dob } = req.body;
    try {
        const { account, nibssResult } = await accountService.createAccount(req.customerId, { KycType, KycID, dob });

        success(res, 201, account, { nibss: nibssResult });
    }
    catch (err) {
        next(err);
    }
};

exports.getBalance= async(req, res, next) => {
    try {
        const balance = await accountService.getBalanceForCustomer(req.customerId);

        success(res, 200, { balance });
    }
    catch (err) {
        next(err);
    }
};