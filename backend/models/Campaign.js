const mongoose = require('mongoose');
const { getModel } = require('../utils/modelFactory');

const CampaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    messageBody: { type: String, required: true },
    imageAttached: { type: String }, // URL or path
    admissionLink: { type: String },
    scheduledAt: { type: Date },
    status: { type: String, enum: ['Draft', 'Scheduled', 'Sent'], default: 'Draft' },
    totalContacts: { type: Number, default: 0 },
    messagesSent: { type: Number, default: 0 },
    messagesDelivered: { type: Number, default: 0 },
    linkClicks: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = getModel('Campaign', CampaignSchema);
