const mongoose = require('mongoose');
const util = require('util');
const config = require('config');

const ConstituencySchema = new mongoose.Schema({
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

const Constituency = mongoose.model('Constituency', ConstituencySchema);

module.exports = Constituency;
