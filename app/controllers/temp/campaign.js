const mongoose = require('mongoose');

const Campaign = require('../models/campaign');
const shared = require('./shared');
const validateForEmptyData = require('./helper').validateForEmptyData;

let getResponseData = (data) => {
  return Object.assign({}, { data: data });
};

const MAX_CAMPAIGNS = 10;
const OFFSET = 0;

var Controller = {
  create: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let title = req.body.title || req.query.title;
    let description = req.body.description || req.query.description;
    let category = req.body.category || req.query.category;
    let constituency = req.body.constituency || req.query.constituency;

    validateForEmptyData({title, description, category, constituency});

    //Category and Constituency should also have _id
    if (!category._id) return next(new Error('Category Identifier not found'))
    if (!constituency._id) return next(new Error('Constituency Identifier not found'))

    let newCampaign = new Campaign();
    newCampaign.title = title;
    newCampaign.description = description;
    newCampaign.created_by = mongoose.Types.ObjectId(req.session.user);
    newCampaign.category = mongoose.Types.ObjectId(category._id);
    newCampaign.constituency = mongoose.Types.ObjectId(constituency._id);

    newCampaign.save((err, campaign) => {
      if (err) return next(err);
      res.status(201).json(getResponseData(campaign));
    });
  },
  getByUserId: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;
    let max_campaigns = req.body.max_campaigns || MAX_CAMPAIGNS;
    max_campaigns = req.body.max_campaigns > MAX_CAMPAIGNS ? MAX_CAMPAIGNS : req.body.max_campaigns;

    let offset = req.body.offset || OFFSET;
    offset = req.body.offset < OFFSET ? OFFSET : req.body.offset;

    Campaign.find()
      .where('created_by', id)
      .skip(offset)
      .limit(max_campaigns)
      .populate('created_by', 'username')
      .populate('constituency category')
      .sort('-created_on')
      .exec((err, campaigns) => {
        if (err) return next(err);

        res.status(200).json(getResponseData(campaigns));
      });
  },
  getById: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;

    Campaign.findOne({_id: id})
      .populate('created_by constituency category')
      .exec((err, campaign) => {
        if (err) return next(err);
        res.status(200).json(getResponseData(campaign));
      });

  },
  getByConstituencyId: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let id = req.body.id || req.query.id;
    let max_campaigns = req.body.max_campaigns || MAX_CAMPAIGNS;
    max_campaigns = req.body.max_campaigns > MAX_CAMPAIGNS ? MAX_CAMPAIGNS : req.body.max_campaigns;

    let offset = req.body.offset || OFFSET;
    offset = req.body.offset < OFFSET ? OFFSET : req.body.offset;

    Campaign.find()
      .where('constituency', id)
      .skip(offset)
      .limit(max_campaigns)
      .populate('constituency category created_by')
      .sort('-created_on')
      .exec((err, campaigns) => {
        if (err) return next(err);
        res.status(200).json(getResponseData(campaigns));
      });
  },
  queryCampaigns: (req, res, next) => {
    if (!req.session.user)
      return next(new Error('Not Authorized'));

    let q = req.body.q || req.query.q;
    delete req.body.q;
    delete req.query.q;

    Campaign.find()
      .where('title', { $regex: new RegExp(q, "i") })
      .where(req.body || req.query)
      .sort('-created_on')
      .exec(function(err, campaigns){
        if (err) return next(err);
        res.json(getResponseData(campaigns));
      });
  }
};

module.exports = Controller;
