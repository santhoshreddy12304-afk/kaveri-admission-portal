const Contact = require('../models/Contact');
const xlsx = require('xlsx');

exports.uploadContacts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        if (!data || data.length === 0) {
            return res.status(400).json({ msg: 'Excel file is empty or invalid format' });
        }

        const contactsToInsert = [];

        // Expecting: Name | Phone Number | Course | State
        for (const row of data) {
            if (row.Name && row['Phone Number'] && row.Course && row.State) {
                contactsToInsert.push({
                    name: row.Name,
                    phoneNumber: String(row['Phone Number']).trim(),
                    course: row.Course,
                    state: row.State
                });
            }
        }

        if (contactsToInsert.length === 0) {
            return res.status(400).json({ msg: 'No valid rows found. Please ensure headers are Name, Phone Number, Course, State.' });
        }

        await Contact.insertMany(contactsToInsert, { ordered: false }).catch(err => {
            // Ignore duplicate key errors if any unique constraints were added later
            console.warn("Some duplicates may have been skipped", err.message);
        });

        res.json({ msg: `Successfully imported ${contactsToInsert.length} contacts` });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during upload');
    }
};

exports.getContactsCount = async (req, res) => {
    try {
        const count = await Contact.countDocuments();
        res.json({ count });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
