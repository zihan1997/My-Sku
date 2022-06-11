const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
    code: {
        type: Number,
        // sku code typically between 8-12 digits,
        // now for testing, min is 1
        min: 1,
        max: Math.pow(10, 13) - 1,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

// do sql 'like' operation
// eg. like * name *
ProductSchema.statics = {
    findByName(name){
        return this.find({name: {$regex: '.*' + name + '.*'}})
    }
}

module.exports = ProductSchema;