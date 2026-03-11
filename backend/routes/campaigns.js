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

module.exports = router;
