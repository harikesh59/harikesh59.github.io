let router = require('express').Router();
let Comment = require('../../controllers/comment');

//api routes
router.post('/comment/create', Comment.create);
router.get('/comment/get_by_story_id', Comment.getByStoryId);
router.get('/comment/get_by_story_id/sentiments', Comment.sentiments);

module.exports = router;
