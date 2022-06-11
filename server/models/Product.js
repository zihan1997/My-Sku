'use strict'

const mongoose = require('mongoose');
const ProductSchema = require( "./schema");

module.exports = mongoose.model('products', ProductSchema);
