const Account = require('../Models/Account');
const Transaction = require('../Models/Transaction');
const nibssService = require('./nibssService');
const { AppError } = require('./accountService');


exports.getMyTransactions = async (customerId) => {
  const account = await Account.findOne({ customer: customerId });
  if (!account) throw new AppError('Account not found', 404);

  return Transaction.find({ account: account._id }).sort({ createAt: -1 });
};

exports.checkStatus = async (customerId, reference) => {
  const account = await Account.findOne({ customer: customerId });
  if (!account) throw new AppError('Account not found', 404);

  const transaction = await Transaction.findOne({ reference, account: account._id });

  if (!transaction) throw new AppError('Transaction not found', 404);

  const nibssStatus = await nibssService.getTransactionByReference(reference);

  return { transaction, nibssStatus };
};