const fs = require('fs');
const path = require('path');

class SimpleMockDb {
    constructor(collectionName) {
        this.filePath = path.join(__dirname, '../data', `${collectionName}.json`);
        if (!fs.existsSync(path.join(__dirname, '../data'))) {
            fs.mkdirSync(path.join(__dirname, '../data'), { recursive: true });
        }
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
        }
    }

    _read() {
        return JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    }

    _write(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }

    async find(query = {}) {
        let data = this._read();
        return data.filter(item => {
            for (let key in query) {
                if (item[key] !== query[key]) return false;
            }
            return true;
        });
    }

    async findOne(query = {}) {
        const results = await this.find(query);
        return results[0] || null;
    }

    async create(doc) {
        let data = this._read();
        const newDoc = { ...doc, _id: Date.now().toString() + Math.random().toString(36).substr(2, 5), createdAt: new Date(), updatedAt: new Date() };
        data.push(newDoc);
        this._write(data);
        return newDoc;
    }

    async insertMany(docs) {
        let data = this._read();
        const newDocs = docs.map(doc => ({ ...doc, _id: Date.now().toString() + Math.random().toString(36).substr(2, 5), createdAt: new Date(), updatedAt: new Date() }));
        data.push(...newDocs);
        this._write(data);
        return newDocs;
    }

    async deleteMany(query = {}) {
        let data = this._read();
        if (Object.keys(query).length === 0) {
            this._write([]);
            return { deletedCount: data.length };
        }
        const filtered = data.filter(item => {
            for (let key in query) {
                if (item[key] === query[key]) return false;
            }
            return true;
        });
        const deletedCount = data.length - filtered.length;
        this._write(filtered);
        return { deletedCount };
    }

    async findById(id) {
        const data = this._read();
        return data.find(item => item._id === id) || null;
    }

    async findByIdAndUpdate(id, update) {
        let data = this._read();
        const index = data.findIndex(item => item._id === id);
        if (index === -1) return null;
        data[index] = { ...data[index], ...update, updatedAt: new Date() };
        this._write(data);
        return data[index];
    }
}

module.exports = SimpleMockDb;
