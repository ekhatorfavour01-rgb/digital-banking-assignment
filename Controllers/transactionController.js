const transactionService = require('../Services/transactionService');
const { success } = require('../Utils/response');


exports.getMyTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionService.getMyTransactions(req.customerId);

    success(res, 200, transactions);
  } catch (err) {
    next(err);
  }
};


exports.checkStatus = async (req, res, next) => {
  try {
    const { reference } = req.params;

    const { transaction, nibssStatus } = await transactionService.checkStatus(req.customerId, reference);

    success(res, 200, transaction, { nibss: nibssStatus });
  } catch (err) {
    next(err);
  }
};
