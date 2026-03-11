const Campaign = require('../models/Campaign');

const sendBulkMessages = async (campaignId) => {
    try {
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) return;

        // Simulate sending messages over time
        const total = campaign.totalContacts;
        campaign.status = 'Sent';
        campaign.messagesSent = total;
        // Simulate a 95% delivery rate
        campaign.messagesDelivered = Math.floor(total * 0.95);

        await campaign.save();

        console.log(`Campaign ${campaign._id} sent to ${total} contacts.`);

    } catch (error) {
        console.error("Error sending bulk messages:", error);
    }
}

module.exports = {
    sendBulkMessages
}
