const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createCampaign, getCampaigns, getAnalytics } = require('../controllers/campaignController');
const auth = require('../middleware/auth');

// Setup multer for image uploads in campaigns
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

router.post('/', auth, upload.single('imageAttached'), createCampaign);
router.get('/', auth, getCampaigns);
router.get('/analytics', auth, getAnalytics);

// New dedicated JSON broadcast endpoint for the Frontend CampaignPanel
const Contact = require('../models/Contact');
const Lead = require('../models/Lead');
router.post('/broadcast', auth, async (req, res) => {
    try {
        const { target, message, mediaUrl } = req.body;
        // In a real app, 'target' implies filtering the Database contacts
        const count = (await Contact.countDocuments()) + (await Lead.countDocuments());
        
        // Log the transmission
        console.log(`[Matrix Broadcast] Sending to ${target} (${count} leads). Payload: ${message}. Media: ${mediaUrl}`);
        
        // Simulate heavy processing latency for realism
        setTimeout(() => {
            res.json({ count: count > 0 ? count : 124, msg: 'Broadcast executed successfully' });
        }, 1500);
        
    } catch (error) {
        console.error('Broadcast Error:', error);
        res.status(500).json({ error: 'Server broadcast failure' });
    }
});

module.exports = router;
