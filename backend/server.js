const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const { sendSuccess } = require('./utils/responseHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
// Uncomment below when you have MongoDB running locally or a connection string ready
connectDB();

// Route Files
const inquiryRoutes = require('./routes/inquiryRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Mount Routes
app.use('/api/v1/inquiries', inquiryRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/rooms', roomRoutes);

// Health check endpoint
app.get('/api/v1', (req, res) => {
    sendSuccess(res, null, 'Welcome to the Hotel Template API v1!');
});

// Default 404 handler for undefined routes
app.use(notFound);

// Centralized Error Handling Middlewares
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
