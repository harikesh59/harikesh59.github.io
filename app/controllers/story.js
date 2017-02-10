const mongoose = require('mongoose');

const Story = require('../models/story');
const shared = require('./shared');
const validateForEmptyData = require('./helper').validateForEmptyData;

let getResponseData = (data) => {
  return Object.assign({}, { data: data });
};

const MAX_TOPICS = 10;
const OFFSET = 0;

var Controller = {
  create: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let text = req.body.text || req.query.text;
    let topic = req.body.topic || req.query.topic;

    validateForEmptyData({text, topic});

    //Category and Constituency should also have _id
    if (!topic._id) return next(new Error('Topic Identifier not found'))

    let newStory = new Story();
    newStory.text = text;
    newStory.author = mongoose.Types.ObjectId(req.session.user._id);
    newStory.topic = mongoose.Types.ObjectId(topic._id);

    newStory.save((err, story) => {
      if (err) return next(err);
      res.status(201).json(getResponseData(story));
    });
  },
  getUserStoriesById: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;
    let max_stories = req.body.max_stories || MAX_TOPICS;
    max_stories = req.body.max_stories > MAX_TOPICS ? MAX_TOPICS : req.body.max_stories;

    let offset = req.body.offset || OFFSET;
    offset = req.body.offset < OFFSET ? OFFSET : req.body.offset;

    Story.find()
      .where('author', id)
      .skip(offset)
      .limit(max_stories)
      .populate('author', 'username')
      .populate('topic')
      .sort('-created_on')
      .exec((err, stories) => {
        if (err) return next(err);

        res.status(200).json(getResponseData(stories));
      });
  },
  getByTopicId: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;
    let max_stories = req.body.max_stories || MAX_TOPICS;
    max_stories = req.body.max_stories > MAX_TOPICS ? MAX_TOPICS : req.body.max_stories;

    let offset = req.body.offset || OFFSET;
    offset = req.body.offset < OFFSET ? OFFSET : req.body.offset;

    Story.find()
      .where('topic', id)
      .skip(offset)
      .limit(max_stories)
      .populate('author', 'username')
      .populate('topic')
      .sort('-created_on')
      .exec((err, stories) => {
        if (err) return next(err);

        res.status(200).json(getResponseData(stories));
      });
  },
  getById: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;

    Story.findOne({_id: id})
      .populate('author topic')
      .exec((err, story) => {
        if (err) return next(err);
        res.status(200).json(getResponseData(story));
      });

  },
  getByConstituencyId: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;
    let max_stories = req.body.max_stories || MAX_TOPICS;
    max_stories = req.body.max_stories > MAX_TOPICS ? MAX_TOPICS : req.body.max_stories;

    let offset = req.body.offset || OFFSET;
    offset = req.body.offset < OFFSET ? OFFSET : req.body.offset;

    Story.find()
      .where('constituency', id)
      .skip(offset)
      .limit(max_stories)
      .populate('constituency category created_by')
      .sort('-created_on')
      .exec((err, stories) => {
        if (err) return next(err);
        res.status(200).json(getResponseData(stories));
      });
  },
  queryStorys: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let q = req.body.q || req.query.q;
    delete req.body.q;
    delete req.query.q;

    Story.find()
      .where('title', { $regex: new RegExp(q, "i") })
      .where(req.body || req.query)
      .sort('-created_on')
      .exec(function(err, stories){
        if (err) return next(err);
        res.json(getResponseData(stories));
      });
  }
};

module.exports = Controller;
