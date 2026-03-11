const mongoose = require('mongoose');
const { getModel } = require('../utils/modelFactory');

const LeadSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    interestedCourse: { type: String, required: true },
    twelfthPercentage: { type: String, required: true },
    message: { type: String },
    status: {
        type: String,
        enum: ['New Lead', 'Contacted', 'Interested', 'Applied', 'Admission Confirmed'],
        default: 'New Lead'
    }
}, { timestamps: true });

module.exports = getModel('Lead', LeadSchema);
