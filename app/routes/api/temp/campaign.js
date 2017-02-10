let router = require('express').Router();
let Campaign = require('../../controllers/campaign');

//api routes
router.post('/campaign/create', Campaign.create);
router.get('/campaign/get_by_user_id', Campaign.getByUserId);
router.get('/campaign/get_by_id', Campaign.getById);
router.get('/campaign/get_by_constituency_id', Campaign.getByConstituencyId);
router.get('/campaign/query_campaigns', Campaign.queryCampaigns);

module.exports = router;
