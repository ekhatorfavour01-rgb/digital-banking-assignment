const axios = require('axios');
const { nibssBaseUrl, nibssApiKey, nibssApiSecret } = require('../Config/env');

const nibssApi = axios.create({
    baseURL: nibssBaseUrl,
    headers: { 'Content-Type': 'application/json' },
});

let cachedToken = null;

const getToken = async () => {
    if (cachedToken) return cachedToken;

    try {
        console.log('API LEY', nibssApiKey);
        console.log('BASE URL', nibssBaseUrl);
    const { data } = await nibssApi.post('/api/auth/token', {
        apiKey: nibssApiKey,
        apiSecret: nibssApiSecret,
    });

    cachedToken = data.token || data.accessToken || data.data?.token;
    return cachedToken;
}
catch (err) {
    console.log('TOKEN ERROR STATUS:', err.response?.status);
    console.log('TOKEN ERROR DATA:', err.response?.data);
    console.log('TOKEN ERROR MESSAGE:', err.message);
    throw err;
}
};

const authHeader = async () => ({ Authorization: `Bearer ${await getToken()}` 
});

exports.createBvn = async (payload) => {
    try {
        const response = await nibssApi.post('/api/insertBvn', payload);
        return response.data;
    }
    catch (err) {
        console.log('NIBSS ERROR:', err.response?.data || err.message);
    }
}

exports.createNin = async (payload) =>  {
    try {
        const response = await nibssApi.post('/api/insertNin', payload);
        return response.data;
    }
    catch (err) {
        console.log('NIBSS ERROR:', err.response?.data || err.message);
    }
}

exports.validateBvn = async (payload) => (await nibssApi.post('/api/validateBvn', payload)).data;

exports.validateNin = async (payload) => (await nibssApi.post('/api/validateNin', payload)).data;

exports.fintechOnboard = async (payload) => (await nibssApi.post('/api/fintech/onboard', payload)).data;


exports.createAccount = async (payload) => {
    const headers = await authHeader();
   try {
        const response = await nibssApi.post('/api/account/create', payload, { headers });
        console.log('NIBSS ACCOUNT RESPONSE:', JSON.stringify(response.data, null, 2));
        return response.data;
    }
    catch (err) {
        console.log('NIBSS ERROR STATUS:', err.response?.status);

        console.log('NIBSS ERROR DATA:', err.response?.data);

        console.log('NIBSS ERROR MESSAGE', err.response?.message);

        throw err;
        
    }
};

exports.nameEnquiry = async (accountNumber) => {
    const headers = await authHeader();
    return (
        await nibssApi.post(`/api/account/name-enquiry/${accountNumber}`,
        {}, 
        { headers }
    )
).data;
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