'use strict'

const mongoose = require('mongoose');
const authSchema = require('./auth_schema');

module.exports = mongoose.model('auth', authSchema);