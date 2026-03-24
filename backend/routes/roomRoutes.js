const express = require('express');
const { getRooms, createRoom, updateRoom, deleteRoom } = require('../controllers/roomController');

const router = express.Router();

router.route('/')
    .get(getRooms)       // Public: Frontend calls this to populate the custom dropdown list
    .post(createRoom);   // Admin: Add "Executive Suite"

router.route('/:id')
    .put(updateRoom)     // Admin: Edit room details 
    .delete(deleteRoom); // Admin: Remove a room type

module.exports = router;
