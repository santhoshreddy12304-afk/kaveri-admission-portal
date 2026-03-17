const Campaign = require('../models/Campaign');
const Contact = require('../models/Contact');
const { sendBulkSMS } = require('./smsService');

const sendBulkMessages = async (campaignId) => {
    try {
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) return;

        console.log(`🚀 Starting processing for Campaign: ${campaign.name}`);
        
        const contacts = await Contact.find();
        const mobiles = contacts.map(c => c.mobileNumber || c.mobile).filter(m => m);

        if (mobiles.length > 0) {
            // Production: Trigger real SMS/WhatsApp via MSG91
            const result = await sendBulkSMS(mobiles, campaign.messageBody);
            
            campaign.status = result.success ? 'Sent' : 'Failed';
            campaign.messagesSent = mobiles.length;
            campaign.messagesDelivered = result.success ? mobiles.length : 0;
            await campaign.save();
        } else {
            campaign.status = 'Sent';
            campaign.messagesSent = 0;
            await campaign.save();
        }

    } catch (error) {
        console.error("Error sending bulk messages:", error);
    }
}

module.exports = {
    sendBulkMessages
}
