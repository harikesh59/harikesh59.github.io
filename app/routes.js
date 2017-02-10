let jwt = require('jwt-simple');
let config = require('config');
let router = require('express').Router();

//Web
let main = require('./routes/main');
let auth = require('./routes/auth');
let admin = require('./routes/admin');

//Api
let user = require('./routes/api/user');
let story = require('./routes/api/story');
let topic = require('./routes/api/topic');
let comment = require('./routes/api/comment');

// let campaign = require('./routes/api/campaign');
// let constituency = require('./routes/api/constituency');
// let category = require('./routes/api/category');



module.exports = (app) => {

  //Extract the token
  app.use((req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (token){
      let user = jwt.decode(token, config.secret);
      if (user.id) req.session.user = user.id;
    }
    next();
  });

  //For the admins
  //Extract the token
  app.use((req, res, next) => {
    const token = req.headers['x-admin-token'];
    if (token){
      let admin = jwt.decode(token, config.secret);
      if (admin.id) req.session.admin = admin.id;
    }
    next();
  });

  //Web Routes
  app.use('/', [main, auth, admin]);

  //API Routes
  app.use('/api/v1', [user, story, topic, comment]);
};
