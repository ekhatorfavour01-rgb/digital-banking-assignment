const Customer = require('../Models/Customer');
const Account = require('../Models/Account');
const nibssService = require('./nibssService');


class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

exports.createAccount = async (customerId) => {
  const customer = await Customer.findById(customerId);
  if (!customer) throw new AppError('Customer not found', 404);

  if (!customer.isVerified) throw new AppError('Customer is not verified/onboarded yet', 400);

  const existingAccount = await Account.findOne({ customer: customerId });

  if (existingAccount) throw new AppError('Customer already has an account', 400);

  const nibssResult = await nibssService.createAccount({
    KycType: customer.bvn ? 'bvn' : 'nin',
    KycID: customer.bvn || customer.nin,
    dob: customer.dob,
  });

  const accountNumber = nibssResult.accountNumber || nibssResult.data?.accountNumber;

  if (!accountNumber) {
    throw new AppError(
      'NIBSS did not return valid account number', 502
    );
  }

  const account = await Account.create({
    customer: customerId,
    accountNumber,
    balance: 15000,
  });

  return { account, nibssResult };
};

exports.getBalanceForCustomer = async (customerId) => {
  const account = await Account.findOne({ customer: customerId });

  if (!account) throw new AppError('Account not found', 404);
  return account.balance;
};

exports.AppError = AppError;