const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        roomType: {
            type: String,
            required: [true, 'Please provide a room type name'],
            unique: true,
            trim: true,
            // Removed the strict enum so Admins can create ANY room type name they want
        },
        totalInventory: {
            type: Number,
            required: [true, 'Please specify total number of physical rooms available for this type'],
            default: 10,
        },
        pricePerNight: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
