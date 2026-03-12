const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const path = require('path');

// Route Imports
const authRoutes = require('./routes/auth');
const leadsRoutes = require('./routes/leads');
const contactsRoutes = require('./routes/contacts');
const campaignsRoutes = require('./routes/campaigns');

dotenv.config();

const app = express();

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // We handle CSP in the frontend meta tag
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors());
app.use(express.json());
// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kaveri_admission';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error. Falling back to Mock Database.');
    });

// Routes Configuration
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/campaigns', campaignsRoutes);

// Base route test
app.get('/', (req, res) => {
    res.send('Kaveri University Admission API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
