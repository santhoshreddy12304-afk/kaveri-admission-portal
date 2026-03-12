const axios = require("axios");

const sendSMS = async (mobile, message) => {
    const authKey = process.env.MSG91_AUTH_KEY;
    const senderId = process.env.MSG91_SENDER_ID;
    const templateId = process.env.MSG91_TEMPLATE_ID;

    if (!authKey || !senderId) {
        console.warn("MSG91 credentials missing. Skipping SMS.");
        return { success: false, message: "Credentials missing" };
    }

    try {
        const response = await axios.post("https://api.msg91.com/api/v5/flow/", {
            template_id: templateId,
            sender: senderId,
            short_url: "0",
            mobiles: mobile.startsWith('+') ? mobile.substring(1) : mobile, // Removing + if present
            // message is usually handle via variables in flow
            var1: message, // Assuming var1 is the message placeholder in MSG91 flow
        }, {
            headers: {
                "authkey": authKey,
                "content-type": "application/json"
            }
        });

        console.log("MSG91 Response:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("MSG91 Error:", error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};

const sendBulkSMS = async (mobiles, message) => {
    // mobiles is an array of phone numbers
    const authKey = process.env.MSG91_AUTH_KEY;
    const senderId = process.env.MSG91_SENDER_ID;
    const templateId = process.env.MSG91_TEMPLATE_ID;

    if (!authKey || !senderId) {
        console.warn("MSG91 credentials missing. Skipping Bulk SMS.");
        return { success: false, message: "Credentials missing" };
    }

    try {
        const response = await axios.post("https://api.msg91.com/api/v5/flow/", {
            template_id: templateId,
            sender: senderId,
            short_url: "0",
            mobiles: mobiles.join(","),
            var1: message,
        }, {
            headers: {
                "authkey": authKey,
                "content-type": "application/json"
            }
        });

        console.log("MSG91 Bulk Response:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("MSG91 Bulk Error:", error.response?.data || error.message);
        return { success: false, error: error.message };
    }
};

module.exports = { sendSMS, sendBulkSMS };
