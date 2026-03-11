const Lead = require('../models/Lead');

// Public route to submit an enquiry
exports.createLead = async (req, res) => {
    try {
        const { fullName, mobileNumber, email, state, city, interestedCourse, twelfthPercentage, message } = req.body;

        const newLead = new Lead({
            fullName,
            mobileNumber,
            email,
            state,
            city,
            interestedCourse,
            twelfthPercentage,
            message
        });

        const lead = await newLead.save();

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
        let lead = await Lead.findById(req.params.id);

        if (!lead) return res.status(404).json({ msg: 'Lead not found' });

        lead.status = status;
        await lead.save();

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
