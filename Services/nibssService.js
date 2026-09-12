const axios = require('axios');
const { nibssBaseUrl, nibssApiKey, nibssApiSecret } = require('../Config/env');

const nibssApi = axios.create({
    baseURL: nibssBaseUrl,
    headers: { 'Content-Type': 'apllication/json' },
});

let cachedToken = null;

const getToken = async () => {
    if (cachedToken) return cachedToken;

    const { data } = await nibssApi.post('/api/auth/token', {
        apiKey: nibssApiKey,
        apiSecret: nibssApiSecret,
    });

    cachedToken = data.token || data.accessToken || data.data?.token;
    return cachedToken;
};

const authheader = async () => ({ Authorization: `Bearer ${await getToken()}` 
});

exports.createBvn = async (payload) => {
    try {
        const resonse = await nibssApi.post('/api/insertBvn', payload);
        return resonse.data;
    }
    catch (err) {
        console.log('NIBSS ERROR:', err.resonse?.data || err.message);
    }
}

exports.createNin = async (payload) =>  {
    try {
        const resonse = await nibssApi.post('/api/insertNin', payload);
        return resonse.data;
    }
    catch (err) {
        console.log('NIBSS ERROR:', err.resonse?.data || err.message);
    }
}

exports.validateBvn = async (payload) => (await nibssApi.post('/api/validateBvn', payload)).data;

exports.validateNin = async (payload) => (await nibssApi.post('/api/validateNin', payload)).data;

exports.fintechOnboard = async (payload) => (await nibssApi.post('/api/fintech/onboard', payload)).data;


exports.createAccount = async (payload) => {
    const headers = await authHeader();
   try {
        const resonse = await nibssApi.post('/api/account/create', payload);
        return resonse.data;
    }
    catch (err) {
        console.log('NIBSS ERROR:', err.resonse?.data || err.message);
    }
};

exports.nameEnquiry = async (accountNumber) => {
    const headers = await authHeader();
    return (await nibssApi.post(`/api/account/name-enquiry/${accountNumber}`, { headers })).data;
};

exports.getBalance = async (accountNumber) => {
    const headers = await authHeader();
    return (await nibssApi.get(`/api/account/balance/${accountNumber}`, { headers })).data;
};

exports.transfer = async (payload) => {
    const headers = await authHeader();
    return (await nibssApi.post('/api/transfer', payload, { headers })).data;
};

exports.getTransactionByReference = async (reference) => {
    const headers = await authHeader();
    return (await nibssApi.get(`/api/transaction/${reference}`, { headers })).data;
};