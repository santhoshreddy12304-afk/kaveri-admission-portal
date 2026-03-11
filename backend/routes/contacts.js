const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadContacts, getContactsCount } = require('../controllers/contactsController');
const auth = require('../middleware/auth');

// Multer config for handling memory storage (we parse buffer directly)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', auth, upload.single('file'), uploadContacts);
router.get('/count', auth, getContactsCount);

module.exports = router;
