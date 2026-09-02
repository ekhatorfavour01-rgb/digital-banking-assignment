require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    
    mongoUri: process.env.MONGO_URL,

    nibssBaseUrl: process.env.NIBSS_BASE_URL || 'https://nibssbyphoenix.onrender.com',
    nibssApiKey: process.env.NIBSS_API_KEY,

    nibssApiSecret: process.env.NIBSS_API_SECRET,
    jwtSecret: process.env.JWT_SECRET,
};