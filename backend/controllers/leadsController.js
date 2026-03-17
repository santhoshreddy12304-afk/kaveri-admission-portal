const Lead = require('../models/Lead');
const { sendSMS } = require('../services/smsService');

// Public route to submit an enquiry
exports.createLead = async (req, res) => {
    try {
        const { fullName, mobileNumber, email, state, city, interestedCourse, twelfthPercentage, message } = req.body;

        const lead = await Lead.create({
            fullName,
            mobileNumber,
            email,
            state,
            city,
            interestedCourse,
            twelfthPercentage,
            message
        });

        // Production: Send welcome SMS/WhatsApp to lead
        const welcomeMsg = `Greetings ${fullName}! Thank you for your interest in Kaveri University for ${interestedCourse}. Our admission team will contact you shortly.`;
        sendSMS(mobileNumber, welcomeMsg);

        res.json(lead);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Admin route to get all leads
exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Admin route to update lead status
exports.updateLeadStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });

        res.json(lead);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Admin route to delete a lead
exports.deleteLead = async (req, res) => {
    try {
        let lead = await Lead.findById(req.params.id);

        if (!lead) return res.status(404).json({ msg: 'Lead not found' });

        await Lead.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Lead removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
