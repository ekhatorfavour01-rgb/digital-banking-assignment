const Account = require('../Models/Account');
const Transaction = require('../Models/Transaction');
const nibssService = require('./nibssService');
const { AppError } = require('./accountService');



const generateReference = () => `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

exports.nameEnquiry = async (accountNumber) => {
  return nibssService.nameEnquiry(accountNumber);
};

exports.transfer = async ({ customerId, recipientAccountNumber, recipientBankCode, amount }) => {
  if (typeof amount !== 'number' || amount <= 0) {
    throw new AppError('Invalid amount',400);
  }

  const senderAccount = await Account.findOne({ customer: customerId });
  if (!senderAccount) throw new AppError('Sender not found', 400);

  if (senderAccount.balance < amount) throw new AppError('Insufficient balance', 400);

  const reference = generateReference();
  
  const nibssResult = await nibssService.transfer({
    from: senderAccount.accountNumber,
    recipientAccountNumber,
    to: recipientAccountNumber,
    amount,
  });

  senderAccount.balance -= amount;
  await senderAccount.save();

  const transaction = await Transaction.create({
    account: senderAccount._id,
    type: recipientBankCode ? 'inter' : 'intra',
    amount,
    recipientAccountNumber,
    recipientBankCode,
    status: 'successful',
  });

  return { transaction, nibssResult };
};