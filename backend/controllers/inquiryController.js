const Inquiry = require('../models/Inquiry');
const { sendSuccess } = require('../utils/responseHandler');

// @desc    Submit a new inquiry (Contact Form)
// @route   POST /api/v1/inquiries
// @access  Public
exports.createInquiry = async (req, res, next) => {
    try {
        const inquiry = await Inquiry.create(req.body);

        // TODO: In the future, send an automated email to the hotel admin here using Nodemailer

        sendSuccess(res, inquiry, 'Your message has been sent successfully.', 201);
    } catch (error) {
        next(error); // Passes the error to our custom centralized errorHandler
    }
};

// @desc    Get all inquiries (For Admin, Optional for now)
// @route   GET /api/v1/inquiries
// @access  Private (Needs auth later)
exports.getInquiries = async (req, res, next) => {
    try {
        const inquiries = await Inquiry.find().sort('-createdAt');
        sendSuccess(res, inquiries, 'Inquiries fetched successfully.');
    } catch (error) {
        next(error);
    }
};
