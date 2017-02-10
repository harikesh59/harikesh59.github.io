const mongoose = require('mongoose');
const util = require('util');
const config = require('config');

const StorySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;
