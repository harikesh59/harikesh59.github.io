let router = require('express').Router();
let Topic = require('../../controllers/topic');

//api routes
router.post('/topic/create', Topic.create);
router.post('/topic/update', Topic.update);
router.post('/topic/remove', Topic.remove);
router.get('/topic/get_all', Topic.getAll);
router.post('/topic/query', Topic.query);

module.exports = router;
