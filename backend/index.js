const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Route Imports
const authRoutes = require('./routes/auth');
const leadsRoutes = require('./routes/leads');
const contactsRoutes = require('./routes/contacts');
const campaignsRoutes = require('./routes/campaigns');

const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

const app = express();

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 requests per windowMs
    message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/', limiter);

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "'unsafe-inline'", "https://apis.google.com"],
            "img-src": ["'self'", "data:", "https://*"],
            "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            "font-src": ["'self'", "https://fonts.gstatic.com"],
            "connect-src": ["'self'", "https://*"]
        }
    },
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection
const PORT = process.env.PORT || 5000;
mongoose.set('bufferCommands', false);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kaveri_admission';

console.log('Attempting MongoDB connection...');
mongoose.connect(MONGO_URI, { 
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
    .then(async () => {
        console.log('✅ MongoDB Connected successfully');
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
        console.error('❌ MongoDB connection error:', err.message);
        console.log('👉 Falling back to SimpleMockDb (Local JSON mode)');
        
        // Ensure default admin exists in Mock DB
        const seedMockAdmin = async () => {
            try {
                const admin = await Admin.findOne({ username: 'admin' });
                if (!admin) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash('admin123', salt);
                    await Admin.create({ username: 'admin', password: hashedPassword, role: 'superadmin' });
                    console.log('✅ Auto-seeded default mock admin: admin / admin123');
                }
            } catch (e) {
                console.error('Failed to seed mock admin:', e.message);
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
