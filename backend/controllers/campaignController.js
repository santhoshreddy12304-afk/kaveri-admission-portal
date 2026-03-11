const Campaign = require('../models/Campaign');
const Contact = require('../models/Contact');
const { sendBulkMessages } = require('../services/whatsappService');

exports.createCampaign = async (req, res) => {
    try {
        const { name, messageBody, admissionLink } = req.body;
        const imageAttached = req.file ? `/uploads/${req.file.filename}` : null;

        const contactsCount = await Contact.countDocuments();

        if (contactsCount === 0) {
            return res.status(400).json({ msg: 'No contacts available to send a campaign.' });
        }

        const newCampaign = new Campaign({
            name,
            messageBody,
            admissionLink,
            imageAttached,
            totalContacts: contactsCount,
            status: 'Scheduled'
        });

        const campaign = await newCampaign.save();

        res.json(campaign);

        // Trigger async job to simulate sending messages
        sendBulkMessages(campaign._id);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find().sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const campaigns = await Campaign.find();

        let totalSent = 0;
        let totalDelivered = 0;
        let totalClicks = 0;

        campaigns.forEach(c => {
            totalSent += c.messagesSent;
            totalDelivered += c.messagesDelivered;
            totalClicks += c.linkClicks;
        });

        res.json({
            totalSent,
            totalDelivered,
            totalClicks,
            totalCampaigns: campaigns.length
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
