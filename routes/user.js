const express = require('express');
const router = express.Router();
const toggleFollow = require('../controller/user/toggle-follow');
const toggleLike = require('../controller/user/toggle-like');
const addComment = require('../controller/user/add-comment');
const getUserProfile = require('../controller/user/get-user-profile');
const upload = require('../middleware/multer');
const setAvatar = require('../controller/user/set-avatar');
const setCover = require('../controller/user/set-cover');
const editProfile = require('../controller/user/edit-profile');
const getOurProfile = require('../controller/user/get-our-profile');

router.route('/post/follow').post(toggleFollow)
router.route('/post/like').post(toggleLike)
router.route('/post/add-comment').post(addComment)
router.route('/user/profile').get(getOurProfile)
router.route('/user/:username').get(getUserProfile)
router.route('/user/set-avatar').post(upload.single('avatar'), setAvatar)
router.route('/user/set-cover').post(upload.single('cover'), setCover)
router.route('/user/edit-profile').put(editProfile)


module.exports = router;