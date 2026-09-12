const transferService = require('../Services/transferService');
const { success, error } = require('../Utils/response');


exports.nameEnquiry = async (req, res, next) => {
  try {
    const { accountNumber } = req.query;

    if (!accountNumber) return error(res, 400, 'accountNumber is required');


    const result = await transferService.nameEnquiry(accountNumber);

    success(res, 200, result);
  } catch (err) {
    next(err);
  }
};


exports.transfer = async (req, res, next) => {
  try {
    const { recipientAccountNumber, recipientBankCode, amount } = req.body;

    if (!recipientAccountNumber || !amount === undefined || amount === null) {
      return error(res, 400, 'recipientAccountNumber and amount are required');
    }

    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
      return error(res, 400, 'ammount must be positive number');
    }

    const { transaction, nibssResult } = await transferService.transfer({
      customerId: req.customerId,
      recipientAccountNumber,
      recipientBankCode,
      amount,
    });

    success(res, 200, transaction, { nibss: nibssResult });
  } catch (err) {
    next(err);
  }
};