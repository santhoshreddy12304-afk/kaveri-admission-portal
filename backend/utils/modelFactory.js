const mongoose = require('mongoose');
const SimpleMockDb = require('./mockDb');

const getModel = (name, schema) => {
    // Create the mongoose model anyway
    let mongooseModel;
    try {
        mongooseModel = mongoose.model(name);
    } catch (e) {
        mongooseModel = mongoose.model(name, schema);
    }

    const mockModel = new SimpleMockDb(name.toLowerCase() + 's');

    // Return a wrapper that decides at runtime
    const wrapper = {
        _name: name,
        _isMock: () => mongoose.connection.readyState !== 1,
        _get: () => (mongoose.connection.readyState === 1 ? mongooseModel : mockModel),
        
        // Proxy common methods
        findOne: (...args) => wrapper._get().findOne(...args),
        find: (...args) => wrapper._get().find(...args),
        create: (...args) => wrapper._get().create(...args),
        insertMany: (...args) => wrapper._get().insertMany(...args),
        deleteMany: (...args) => wrapper._get().deleteMany(...args),
        findById: (...args) => wrapper._get().findById(...args),
        findByIdAndUpdate: (...args) => wrapper._get().findByIdAndUpdate(...args),
        findByIdAndDelete: (...args) => wrapper._get().findByIdAndDelete(...args),
        countDocuments: (...args) => {
            const model = wrapper._get();
            if (model.countDocuments) return model.countDocuments(...args);
            // Mock DB count
            return model.find(...args).then(res => res.length);
        },
        save: (doc) => {
            // This is for new Instance().save()
            // We handle this by adding a save method to the mock docs
            return doc.save ? doc.save() : mockModel.create(doc);
        }
    };

    return wrapper;
};

module.exports = { getModel };
