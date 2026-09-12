const jwt = require('jsonwebtoken');
const Customer = require('../Models/Customer');
const { jwtSecret } = require('../Config/env');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authorization token is required',
                
             });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, jwtSecret);

        const customer = await Customer.findById(decoded.customerId);

        if (!customer) {
            return res.status(401).json({ success: false, message: 'Invalid authentication token' });
        }

        req.customerId = customer._id;
        req.customer = customer;

        next();
    }
    catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired authentication token' });
    }
};