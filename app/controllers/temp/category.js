const mongoose = require('mongoose');

const Category = require('../models/category');
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

    let newCategory = new Category();
    newCategory.name = name;
    newCategory.save((err, category) => {
      if (err) return next(err);
      res.status(201).json(getResponseData(category));
    });
  },
  getAll: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    Category.find({}, (err, categories) => {
      if (err) return next(err);
      res.status(200).json(getResponseData(categories));
    });
  },
  query: (req, res, next) => {
    if (!req.session.admin && !req.session.user)
      return next(new Error('Not Authorized'));

    let query = req.body.q || req.params.q;

    if (!query) return next(new Error('Query Not Found'))

    Category.find()
      .where('name', { $regex: new RegExp(query, "i") })
      .exec(function(err, categories){
        if (err) return next(err);
        res.json(getResponseData(categories));
      });
  },
  update: (req, res, next) => {
    if (!req.session.admin)
      return next(new Error('Not Authorized'));

    let _id = req.body._id || req.query._id;
    let name = req.body.name || req.query.name;

    validateForEmptyData({_id, name});

    Category.findOne({_id: _id}, (err, category) => {
      if (err) return next(err);
      if (!category) return next(new Error('Category not found'));

      category.name = name;
      category.save((err, category) => {
        if (err) return next(err);
        res.json(getResponseData(category));
      });
    });
  },
  remove: (req, res, next) => {
    if (!req.session.admin)
      return next(new Error('Not Authorized'));

    let _id = req.body._id || req.query._id;

    validateForEmptyData({_id});

    Category.remove({_id: _id}, (err, removed) => {
      if (err) return next(err);
      res.json(getResponseData(removed));
    });
  }
};

module.exports = Controller;
