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

        const campaign = await Campaign.create({
            name,
            messageBody,
            admissionLink,
            imageAttached,
            totalContacts: contactsCount,
            status: 'Scheduled'
        });

        // The following line was provided in the instruction's "Code Edit" but is syntactically incorrect
        // if placed directly within the Campaign.create object and refers to an undeclared 'Lead' model.
        // As per instructions to make the change faithfully and syntactically correct,
        // and since there are no .save() calls to replace, this line cannot be integrated as-is.
        // const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });

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
