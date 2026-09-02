const { jwtSecret } = require('../Config/env');
const Customer = require('../Models/Customer');
const nibssService = require('./nibssService');

exports.onboardWithBvn = async ({ firstName, lastName, email, bvn, dob, phone }) => {
  const nibssResult = await nibssService.createBvn({ bvn, firstName, lastName, dob, phone });

  const createCustomerToken = (customerId) => jwtSecret.sign(
    { customerId: customerId.toString() },
    jwtSecret,
    { expiresIn: '7d' }
  );

  const customer = await Customer.create({
    firstName,
    lastName,
    email,
    bvn,
    dob,
    isVerified: true,
  });

  const token = createCustomerToken(customer._id);

  return { customer, token, nibssResult };
};

exports.onboardWithNin = async ({ firstName, lastName, email, dob, nin }) => {
  const nibssResult = await nibssService.createNin({ nin, firstName, lastName, dob });

  const createCustomerToken = (customerId) => jwtSecret.sign(
    { customerId: customerId.toString() },
    jwtSecret,
    { expiresIn: '7d' }
  );


  const customer = await Customer.create({
    firstName,
    lastName,
    email,
    nin,
    dob,
    isVerified: true,
  });

   const token = createCustomerToken(customer._id);

  return { customer, token, nibssResult };
};