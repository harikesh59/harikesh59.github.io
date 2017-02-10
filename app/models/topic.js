const mongoose = require('mongoose');
const util = require('util');
const config = require('config');

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;
