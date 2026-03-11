const mongoose = require('mongoose');
const SimpleMockDb = require('../utils/mockDb');

const getModel = (name, schema) => {
    // If not connected to MongoDB, return a mock model
    if (mongoose.connection.readyState !== 1) {
        console.log(`Using Mock Model for ${name}`);
        return new SimpleMockDb(name.toLowerCase() + 's');
    }
    
    // Otherwise return standard Mongoose model
    try {
        return mongoose.model(name);
    } catch (e) {
        return mongoose.model(name, schema);
    }
};

module.exports = { getModel };
