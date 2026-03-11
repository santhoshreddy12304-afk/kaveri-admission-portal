const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Lead = require('./models/Lead');
const Contact = require('./models/Contact');
const Campaign = require('./models/Campaign');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kaveri_admission';

const seedData = async () => {
    try {
        console.log('Starting seed process...');
        await mongoose.connect(MONGO_URI).catch(err => console.log('⚠️ MongoDB not available, seeding into Mock DB.'));
        
        // Wait a bit to ensure state is recognized
        await new Promise(resolve => setTimeout(resolve, 500));

        // Clear existing data (optional for clean state)
        await Admin.deleteMany({});
        await Lead.deleteMany({});
        await Contact.deleteMany({});
        await Campaign.deleteMany({});

        // 1. Create Default Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        await Admin.create({
            username: 'admin',
            password: hashedPassword,
            role: 'superadmin'
        });
        console.log('✅ Admin user created (admin / admin123)');

        // 2. Create Mock Leads
        const courses = ["B.Tech Computer Science", "MBA Finance", "B.Sc Biotechnology", "B.Tech Mechanical"];
        const statuses = ['New Lead', 'Contacted', 'Interested', 'Applied', 'Admission Confirmed'];
        const mockLeads = Array.from({ length: 50 }).map((_, i) => ({
            fullName: `Student ${i + 1}`,
            mobileNumber: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
            email: `student${i + 1}@example.com`,
            state: 'Karnataka',
            city: 'Bangalore',
            interestedCourse: courses[Math.floor(Math.random() * courses.length)],
            twelfthPercentage: (60 + Math.random() * 35).toFixed(2),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            message: 'Looking for admission details.'
        }));

        await Lead.insertMany(mockLeads);
        console.log(`✅ ${mockLeads.length} Mock Leads created`);

        // 3. Create Mock Contacts for Bulk Upload Testing
        const mockContacts = Array.from({ length: 1500 }).map((_, i) => ({
            name: `Contact ${i + 1}`,
            phoneNumber: `+91 99${Math.floor(10000000 + Math.random() * 90000000)}`,
            course: courses[Math.floor(Math.random() * courses.length)],
            state: 'Karnataka'
        }));

        await Contact.insertMany(mockContacts);
        console.log(`✅ ${mockContacts.length} Mock Contacts created`);

        console.log('\n🎉 Seeding Completed Successfully! You can now log into the Dashboard.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
