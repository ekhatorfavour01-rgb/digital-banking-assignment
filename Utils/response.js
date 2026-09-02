exports.success = (res, statusCode, data, extra = {}) => {
    res.status(statusCode).json({ success: true, data, ...extra });
};

exports.error = (res, statusCode, message) => {
    res.status(statusCode).json({ success: false, message});
};