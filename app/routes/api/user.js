let router = require('express').Router();
let User = require('../../controllers/user');

//api routes
router.post('/user/create', User.create);
router.post('/user/token', User.token);
router.post('/user/check_email', User.check_email);
router.post('/user/check_username', User.check_username);
router.get('/user/get_by_id', User.get_by_id);
router.get('/user/get_all', User.get_all);
router.post('/user/toggle_anonymous', User.toggle_anonymous);
router.get('/user/follow_user', User.follow_user);
router.get('/user/unfollow_user', User.unfollow_user);
router.get('/user/follow_story', User.follow_story);
router.get('/user/unfollow_story', User.unfollow_story);
router.get('/user/get_my_followed_stories', User.get_my_followed_stories);
router.post('/user/update_location', User.update_location);
router.get('/user/get_all_locations', User.get_all_locations);

module.exports = router;
