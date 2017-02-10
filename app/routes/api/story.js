let router = require('express').Router();
let Story = require('../../controllers/story');

//api routes
router.post('/story/create', Story.create);
router.get('/story/get_user_stories_by_id', Story.getUserStoriesById);
router.get('/story/get_by_topic_id', Story.getByTopicId);
router.get('/story/get_by_id', Story.getById);
router.get('/story/get_by_constituency_id', Story.getByConstituencyId);
router.get('/story/query_storys', Story.queryStorys);

module.exports = router;
