const express = require('express');
const { 
    createBooking, 
    getBookings, 
    checkAvailability,
    getBookingById,
    updateBooking,
    deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

// @route   POST /api/v1/bookings/availability
// @desc    Check room availability for specific dates
router.post('/availability', checkAvailability);

router.route('/')
    .get(getBookings)      // Admin: View all bookings
    .post(createBooking);  // Public: People making reservations

router.route('/:id')
    .get(getBookingById)   // Admin/User: View single booking details
    .put(updateBooking)    // Admin: Update booking (e.g., change status to "confirmed")
    .delete(deleteBooking); // Admin: Delete/Cancel a booking

module.exports = router;
