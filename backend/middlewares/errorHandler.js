const { sendError } = require('../utils/responseHandler');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new Error(message);
        return sendError(res, message, 404);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new Error(message);
        return sendError(res, message, 400);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new Error(message);
        return sendError(res, message, 400);
    }

    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    sendError(res, error.message || 'Internal Server Error', statusCode, process.env.NODE_ENV === 'development' ? err.stack : null);
};

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports = { errorHandler, notFound };
