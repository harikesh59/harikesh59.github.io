let router = require('express').Router();
let Auth = require('../controllers/auth');

//web routes
router.route('/register')
  .get(Auth.getRegister)
  .post(Auth.postRegister);

router.route('/login')
  .get(Auth.getLogin)
  .post(Auth.postLogin);

router.route('/logout')
  .get(Auth.getLogout)

module.exports = router;
