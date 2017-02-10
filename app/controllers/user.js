const mongoose = require('mongoose');
const User = require('../models/user');
const shared = require('./shared');

const validateForEmptyData = require('./helper').validateForEmptyData;

let getResponseData = (data) => {
  return Object.assign({}, { data: data });
};

var Controller = {
  create: (req, res, next) => {

    let username = req.body.username || req.query.username;
    let email = req.body.email || req.query.email;
    let password = req.body.password || req.query.password;
    let first_name = req.body.first_name || req.query.first_name;
    let last_name = req.body.last_name || req.query.last_name;

    let userData = {
      username,
      email,
      password,
      first_name,
      last_name
    }

    let err = validateForEmptyData(userData);
    if (err) return next(err);

    let newUser = User(userData);
    newUser.save((err, user) => {
      if (err) return next(err);
      user = user.toJSON();
      delete user.password;
      res.status(201).json(getResponseData(user));
    });
  },
  token: (req, res, next) => {

    let username = req.body.username || req.query.username;
    let password = req.body.password || req.query.password;

    if(!username) return next(new Error('Username not found'));
    if(!password) return next(new Error('Password not found'));


    User.findOne({username})
      .select('password')
      .exec((err, user) => {
        if (err) return next(err);

        user.comparePassword(req.body.password, user.password, (err, isMatched) => {
          if (err) return next(err);

          if (!isMatched) return next(new Error('Password invalid'));

          const token = user.getJWTToken();
          res.status(200).json(getResponseData({token}));

        });
    });
  },
  check_email: (req, res, next) => {
    let email = req.body.email || req.query.email;
    if(!email) return next(new Error('Email not found'));
    User.findOne({email}, (err, user) => {
      if (err) return next(err);
      if (user) return res.status(200).json(getResponseData({result: false}));
      else return res.status(200).json(getResponseData({result: true}));
    });
  },
  check_username: (req, res, next) => {
    let username = req.body.username || req.query.username;
    if(!username) return next(new Error('Username not found'));
    User.findOne({username}, (err, user) => {
      if (err) return next(err);
      if (user) return res.status(200).json(getResponseData({result: false}));
      else return res.status(200).json(getResponseData({result: true}));
    });
  },
  get_by_id: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;
    if(!id) return next(new Error('Identifier not found'));
    User.findOne({_id: id}, (err, user) => {
      if (err) return next(err);
      if (user) return res.status(200).json(getResponseData(user));
      else return next(new Error('User not found'));
    });
  },
  toggle_anonymous: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    User.findOne({_id: req.session.user._id}, (err, user) => {
      if (err) return next(err);
      if (!user) return next(new Error('User not found'));

      user.is_anonymous = !user.is_anonymous;
      user.save((err, user) => {
        if (err) return next(err);
        else return res.status(200).json(getResponseData({is_anonymous: user.is_anonymous}));
      });
    });
  },
  follow_user: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;
    if(!id) return next(new Error('User Identifier not found'));

    if (id === req.session.user._id) {
      return next(new Error('Circular Following not allowed'))
    }

    User.findOne({_id: req.session.user._id}, (err, user) => {
      if (err) return next(err);
      if (!user) return next(new Error('User not found'));

      let following_user = user;

      User.findOne({_id: id}, (err, user) => {

        if (err) return next(err);
        if (!user) return next(new Error('User not found'));

        let followed_user = user;

        following_user.followings.push(mongoose.Types.ObjectId(id));
        followed_user.followers.push(mongoose.Types.ObjectId(req.session.user._id));

        following_user.save((err, user) => {
          if (err) return next(err);
          followed_user.save((err, user) => {
            if (err) return next(err);
            else return res.status(200).json(getResponseData({result: "ok"}));
          });
        });

      });

    });
  },
  unfollow_user: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;
    if(!id) return next(new Error('User Identifier not found'));

    if (id === req.session.user._id) {
      return next(new Error('Circular Following not allowed'))
    }

    User.findOne({_id: req.session.user._id}, (err, user) => {
      if (err) return next(err);
      if (!user) return next(new Error('User not found'));

      let following_user = user;

      User.findOne({_id: id}, (err, user) => {

        if (err) return next(err);
        if (!user) return next(new Error('User not found'));

        let followed_user = user;

        following_user.followings.pull(mongoose.Types.ObjectId(id));
        followed_user.followers.pull(mongoose.Types.ObjectId(req.session.user._id));

        following_user.save((err, user) => {
          if (err) return next(err);
          followed_user.save((err, user) => {
            if (err) return next(err);
            else return res.status(200).json(getResponseData({result: "ok"}));
          });
        });

      });

    });
  },
  follow_story: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    let story_id = req.body.id || req.query.id;
    if(!story_id) return next(new Error('Story Identifier not found'));

    User.findOne({_id: req.session.user._id}, (err, user) => {
      if (err) return next(err);
      if (!user) return next(new Error('User not found'));

      user.following_stories.push(mongoose.Types.ObjectId(story_id));
      user.save((err, user) => {
        if (err) return next(err);
        else return res.status(200).json(getResponseData({result: "ok"}));
      });

    });
  },
  unfollow_story: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    let story_id = req.body.id || req.query.id;
    if(!story_id) return next(new Error('Story Identifier not found'));

    User.findOne({_id: req.session.user._id}, (err, user) => {
      if (err) return next(err);
      if (!user) return next(new Error('User not found'));

      user.following_stories.pull(mongoose.Types.ObjectId(story_id));
      user.save((err, user) => {
        if (err) return next(err);
        else return res.status(200).json(getResponseData({result: "ok"}));
      });

    });
  },
  get_my_followed_stories: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    User.findOne({_id: req.session.user._id})
      .select('following_stories')
      .exec((err, campaigns) => {
        if (err) return next(err);
        res.status(200).json(getResponseData(campaigns));
      });
  },
  get_all: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

      User.find({ _id: { $ne: req.session.user._id } })
        .select('')
        .exec((err, users) => {
          if (err) return next(err);

          users = users.map((user) => {
            my_user = {};
            if (user.is_anonymous) my_user['full_name'] = 'anonymous';
            else my_user['full_name'] = user.first_name + ' ' + user.last_name;

            my_user['_id'] = user._id;
            my_user['no_stories'] = user.following_stories.length;

            return my_user;
          });

          res.status(200).json(getResponseData(users));
        });
  },
  update_location: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    User.findOne({_id: req.session.user._id})
      .exec((err, user) => {
        if (err) return next(err);
        if (!user) return next(new Error('User not found'));

        let location = req.body.location || req.query.location;
        if(!location) return next(new Error('Location not found'));


        user.last_location = location;

        user.save((err, user) => {
          if (err) return next(err);
          else return res.status(200).json(getResponseData({result: "ok"}));
        });

      });
  },
  get_all_locations: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

      User.find({ _id: { $ne: req.session.user._id } })
        .select('last_location')
        .exec((err, users) => {
          if (err) return next(err);
          res.status(200).json(getResponseData(users));
        });
  },
};

module.exports = Controller;
