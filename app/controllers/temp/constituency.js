const mongoose = require('mongoose');

const Constituency = require('../models/constituency');
const shared = require('./shared');
const validateForEmptyData = require('./helper').validateForEmptyData;

let getResponseData = (data) => {
  return Object.assign({}, { data: data });
};

const MAX_CAMPAIGNS = 10;
const OFFSET = 0;

var Controller = {
  create: (req, res, next) => {
    if (!req.session.admin)
      return next(new Error('Not Authorized'));

    let name = req.body.name || req.query.name;

    let newConstituency = new Constituency();
    newConstituency.name = name;
    newConstituency.save((err, constituency) => {
      if (err) return next(err);
      res.status(201).json(getResponseData(constituency));
    });
  },
  getAll: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    Constituency.find({}, (err, constituencies) => {
      if (err) return next(err);
      res.status(200).json(getResponseData(constituencies));
    });
  },
  query: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    let query = req.body.q || req.params.q;

    if (!query) return next(new Error('Query Not Found'))

    Constituency.find()
      .where('name', { $regex: new RegExp(query, "i") })
      .exec(function(err, constituencies){
        if (err) return next(err);
        res.json(getResponseData(constituencies));
      });
  },
  update: (req, res, next) => {
    if (!req.session.admin)
      return next(new Error('Not Authorized'));

    let _id = req.body._id || req.query._id;
    let name = req.body.name || req.query.name;

    validateForEmptyData({_id, name});

    Constituency.findOne({_id: _id}, (err, constituency) => {
      if (err) return next(err);
      if (!constituency) return next(new Error('Constituency not found'));

      constituency.name = name;
      constituency.save((err, constituency) => {
        if (err) return next(err);
        res.json(getResponseData(constituency));
      });
    });
  },
  remove: (req, res, next) => {
    if (!req.session.admin)
      return next(new Error('Not Authorized'));

    let _id = req.body._id || req.query._id;

    validateForEmptyData({_id});

    Constituency.remove({_id: _id}, (err, removed) => {
      if (err) return next(err);
      res.json(getResponseData(removed));
    });
  }
};

module.exports = Controller;
