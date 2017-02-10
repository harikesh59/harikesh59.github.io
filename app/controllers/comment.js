const mongoose = require('mongoose');

const Comment = require('../models/comment');

let getResponseData = (data) => {
  return Object.assign({}, { data: data });
};

const MAX_COMMENTS = 10;
const OFFSET = 0;

const request = require('request');

var Controller = {
  create: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let text = req.body.text || req.query.text;
    let story = req.body.story || req.query.story;

    let newComment = new Comment();
    newComment.text = text;
    newComment.story = mongoose.Types.ObjectId(story);
    newComment.created_by = mongoose.Types.ObjectId(req.session.user._id);
    newComment.save((err, comment) => {
      if (err) return next(err);
      res.status(201).json(getResponseData(comment));
    });
  },
  getByStoryId: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;
    let max_comments = req.body.max_comments || MAX_COMMENTS;
    max_comments = req.body.max_comments > MAX_COMMENTS ? MAX_COMMENTS : req.body.max_comments;

    let offset = req.body.offset || OFFSET;
    offset = req.body.offset < OFFSET ? OFFSET : req.body.offset;

    Comment.find()
      .where('story', id)
      .skip(offset)
      .limit(max_comments)
      .populate('created_by')
      .sort('-created_on')
      .exec((err, comments) => {
        if (err) return next(err);
        res.status(200).json(getResponseData(comments));
      });

  },
  sentiments: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;
    let max_comments = req.body.max_comments || MAX_COMMENTS;
    max_comments = req.body.max_comments > MAX_COMMENTS ? MAX_COMMENTS : req.body.max_comments;

    let offset = req.body.offset || OFFSET;
    offset = req.body.offset < OFFSET ? OFFSET : req.body.offset;

    Comment.find()
      .where('story', id)
      .skip(offset)
      .limit(max_comments)
      .select('text')
      .exec((err, comments) => {

        if (comments.length === 0) {
          return res.status(200).json(getResponseData({
            documents: [
              {
                score: 0.00
              }
            ]
          }));
        }

        comments = comments.map((c) => { return c['text'] });

        let text = comments.join(' ');

        request({
            url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
            method: 'post',
            headers: {
              'Ocp-Apim-Subscription-Key': 'd859ba5976f745b088582363b37d5b93'
            },
            body: JSON.stringify({
              documents: [
                {
                   language: "en",
                   id: "1",
                   text: text
                 }
              ]
            })
          },
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(body);
              return res.status(200).json(getResponseData(JSON.parse(body)));
            }
            else{
              console.log(error);
              return res.send(body);
            }
        });

      });

  }
};

module.exports = Controller;
