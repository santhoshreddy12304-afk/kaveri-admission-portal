const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Route Imports
const authRoutes = require('./routes/auth');
const leadsRoutes = require('./routes/leads');
const contactsRoutes = require('./routes/contacts');
const campaignsRoutes = require('./routes/campaigns');

const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kaveri_admission';

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected successfully');
        // Auto-seed admin if empty
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await Admin.create({ username: 'admin', password: hashedPassword, role: 'superadmin' });
            console.log('✅ Auto-seeded default admin: admin / admin123');
        }
    })
    .catch(err => {
        console.error('MongoDB connection error. Falling back to Mock Database.');
        // Even for Mock DB, ensure admin exists
        const seedMockAdmin = async () => {
            const admin = await Admin.findOne({ username: 'admin' });
            if (!admin) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash('admin123', salt);
                await Admin.create({ username: 'admin', password: hashedPassword, role: 'superadmin' });
                console.log('✅ Auto-seeded default mock admin: admin / admin123');
            }
        };
        seedMockAdmin();
    });

// Routes Configuration
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/campaigns', campaignsRoutes);

// Base route test
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Kaveri University Admission API is connected & healthy' });
});

app.get('/', (req, res) => {
    res.send('Kaveri University Admission API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
