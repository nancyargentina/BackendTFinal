const mongoose = require("mongoose");

class MongoContenedor {
    constructor(collection) {
        this.collection = collection;
    }

    async getElements() {
        return await this.collection.find({});
    }
    async getById(id) {
        return await this.collection.findById(id);
    }
    async save(obj) {
        //const newDocument= new this.collection(obj)
        //newDocument.save()
        return await new this.collection(obj).save();
    }
    async update(obj) {
        return await this.collection.updateOne({ _id: obj.id }, { $set: obj });
    }
    async deleteById(id) {
        return await this.collection.deleteOne({ _id: id });
    }
}
module.exports = MongoContenedor;
