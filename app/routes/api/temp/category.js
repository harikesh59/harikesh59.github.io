let router = require('express').Router();
let Category = require('../../controllers/category');

//api routes
router.post('/category/create', Category.create);
router.post('/category/update', Category.update);
router.post('/category/remove', Category.remove);
router.get('/category/get_all', Category.getAll);
router.post('/category/query', Category.query);

module.exports = router;
