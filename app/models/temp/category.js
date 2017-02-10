const mongoose = require('mongoose');
const util = require('util');
const config = require('config');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
