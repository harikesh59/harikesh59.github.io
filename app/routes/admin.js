let router = require('express').Router();
let Admin = require('../controllers/admin');

//web routes
router.get('/admin', Admin.home);

router.route('/admin/login')
  .get(Admin.getLogin)
  .post(Admin.postLogin);

router.post('/admin/token', Admin.token);

router.get('/admin/logout', Admin.getLogout);



module.exports = router;
