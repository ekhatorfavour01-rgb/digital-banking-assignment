const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const errorMiddleware = require('./Middleware/errorMiddleware');
const connectDB = require('./Config/db');
const { port } = require('./Config/env');

const onboardingRoutes = require('./Routes/onboardingRoutes');
const accountRoutes = require('./Routes/accountRoutes');
const transferRoutes = require('./Routes/transferRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');


const app = express();


app.use(express.json());

app.use('/api/onboarding', onboardingRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/transactions', transactionRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Digital Banking Backend is running' });
});


app.use(errorMiddleware);


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`ð Server running on port ${port}`);
  });
});
