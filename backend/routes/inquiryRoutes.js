const express = require('express');
const { createInquiry, getInquiries } = require('../controllers/inquiryController');

const router = express.Router();

router.route('/')
    .get(getInquiries)    // Admin: View all
    .post(createInquiry); // Public: People filling the form

module.exports = router;
