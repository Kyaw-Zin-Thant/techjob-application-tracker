require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const interviewRoutes = require('./routes/interviewRoutes');
const linkedinRoutes = require('./routes/linkedinRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/interviews', interviewRoutes);
// app.use('/linkedin', linkedinRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
