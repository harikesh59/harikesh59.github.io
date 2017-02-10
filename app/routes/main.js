let router = require('express').Router();
let Main = require('../controllers/main');

//web routes
router.get('/', Main.index);
router.get('/user/:user_id', Main.profile);

module.exports = router;
