const mongoose = require('mongoose');
const { getModel } = require('../utils/modelFactory');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    course: { type: String, required: true },
    state: { type: String, required: true },
}, { timestamps: true });

module.exports = getModel('Contact', ContactSchema);
