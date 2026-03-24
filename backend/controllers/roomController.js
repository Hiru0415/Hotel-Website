const Room = require('../models/Room');
const { sendSuccess } = require('../utils/responseHandler');

// @desc    Get all room types
// @route   GET /api/v1/rooms
// @access  Public (Frontend needs this to build the dropdowns)
exports.getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        sendSuccess(res, rooms, 'Rooms fetched successfully.');
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new room type
// @route   POST /api/v1/rooms
// @access  Private (Admin)
exports.createRoom = async (req, res, next) => {
    try {
        // e.g., body: { "roomType": "Presidential Suite", "totalInventory": 2 }
        const room = await Room.create(req.body);
        sendSuccess(res, room, 'Room type created successfully.', 201);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a room type (e.g., change inventory or name)
// @route   PUT /api/v1/rooms/:id
// @access  Private (Admin)
exports.updateRoom = async (req, res, next) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        sendSuccess(res, room, 'Room updated successfully.');
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a room type
// @route   DELETE /api/v1/rooms/:id
// @access  Private (Admin)
exports.deleteRoom = async (req, res, next) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);

        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        sendSuccess(res, null, 'Room deleted successfully.');
    } catch (error) {
        next(error);
    }
};
