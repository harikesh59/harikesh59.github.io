const mongoose = require('mongoose');
const util = require('util');
const config = require('config');

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  constituency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Constituency',
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;
