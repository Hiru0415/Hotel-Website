const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { sendSuccess } = require('../utils/responseHandler');

// @desc    Check room availability for given dates
// @route   POST /api/v1/bookings/availability
// @access  Public
exports.checkAvailability = async (req, res, next) => {
    try {
        const { checkInDate, checkOutDate } = req.body;

        if (!checkInDate || !checkOutDate) {
            return res.status(400).json({ success: false, message: 'Please provide both check-in and check-out dates' });
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkIn >= checkOut) {
            return res.status(400).json({ success: false, message: 'Check-out date must be after check-in date' });
        }

        // 1. Get all room types and their total inventory (e.g., 10 Standards, 5 Deluxes)
        const allRooms = await Room.find();
        
        // 2. Find all CONFIRMED or PENDING bookings that overlap with requested dates
        const overlappingBookings = await Booking.find({
            status: { $in: ['confirmed', 'pending'] },
            $or: [
                { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } }
            ]
        });

        // 3. Tally up how many rooms of each type are currently booked
        const bookedCounts = {
            'Standard': 0,
            'Deluxe': 0,
            'Super Deluxe': 0
        };

        overlappingBookings.forEach(booking => {
            booking.rooms.forEach(room => {
                // If a booking asks for 2 Deluxe rooms, we add 2 to the count
                bookedCounts[room.roomType] += 1; // Assuming 1 room per array entry. If they can book multiple of same type in one row, adjust logic.
            });
        });

        // 4. Calculate available rooms
        const availability = allRooms.map(room => {
            const isAvailable = room.totalInventory - bookedCounts[room.roomType] > 0;
            return {
                roomType: room.roomType,
                totalInventory: room.totalInventory,
                currentlyBooked: bookedCounts[room.roomType],
                available: isAvailable,
                roomsLeft: room.totalInventory - bookedCounts[room.roomType]
            };
        });

        sendSuccess(res, availability, 'Availability checked successfully.');
    } catch (error) {
        next(error);
    }
};