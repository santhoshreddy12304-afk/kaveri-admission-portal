const mongoose = require('mongoose');
const { getModel } = require('../utils/modelFactory');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin'
    }
}, { timestamps: true });

module.exports = getModel('Admin', AdminSchema);
