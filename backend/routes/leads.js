const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLeadStatus, deleteLead } = require('../controllers/leadsController');
const auth = require('../middleware/auth');

router.post('/', createLead); // Public
router.get('/admin', auth, getLeads);
router.put('/admin/:id', auth, updateLeadStatus);
router.delete('/admin/:id', auth, deleteLead);

module.exports = router;
