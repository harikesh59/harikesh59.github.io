const mongoose = require('mongoose');
const util = require('util');
const config = require('config');

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
