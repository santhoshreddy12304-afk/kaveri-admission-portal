const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        admin = await Admin.create({
            username,
            password: hashedPassword
        });

        const payload = {
            admin: {
                id: admin._id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        let admin = await Admin.findOne({ username });
        console.log(`Login attempt for username: ${username}. Found in DB: ${admin ? 'Yes' : 'No'}`);
        
        if (!admin) {
            return res.status(400).json({ message: 'Invalid Credentials (User not found)' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        console.log(`Password match for ${username}: ${isMatch ? 'Success' : 'Failed'}`);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials (Password mismatch)' });
        }

        const payload = {
            admin: {
                id: admin._id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAdminUser = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id); // SimpleMockDb search
        if (admin && admin.password) delete admin.password;
        res.json(admin);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
