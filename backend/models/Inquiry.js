const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide your email address'],
        },
        phone: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            required: [true, 'Please provide a message'],
        },
        status: {
            type: String,
            enum: ['pending', 'reviewed', 'resolved'],
            default: 'pending',
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
