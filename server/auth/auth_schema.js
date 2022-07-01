const mongoose = require('mongoose');
const { Schema } = mongoose;

const auth_schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = auth_schema;