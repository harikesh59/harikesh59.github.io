let router = require('express').Router();
let Constituency = require('../../controllers/constituency');

//api routes
router.post('/constituency/create', Constituency.create);
router.post('/constituency/update', Constituency.update);
router.post('/constituency/remove', Constituency.remove);
router.get('/constituency/get_all', Constituency.getAll);
router.post('/constituency/query', Constituency.query);

module.exports = router;
