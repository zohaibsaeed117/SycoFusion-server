const express = require('express');
const app = express();
const router = express.Router();
const newPost = require('../controller/posts/new-post')
const getSinglePost = require('../controller/posts/get-single-post');
const feedPostInfinite = require('../controller/posts/feed-posts-infinite')
const followingPostInfinite = require('../controller/posts/following-posts-infinite')
const getProfilePosts = require('../controller/posts/get-profile-posts')
const upload = require('../middleware/multer');
const deletePost = require('../controller/posts/delete-post');
const editPost = require('../controller/posts/edit-post');

router.route('/post/get-post-feed').get(feedPostInfinite)
router.route('/post/get-post-following').get(followingPostInfinite)
router.route('/post/get-profile-post/:userId').get(getProfilePosts)

router.route('/post/:postId').get(getSinglePost).delete(deletePost)

router.route('/post/add-post').post(upload.array('images', 5), newPost)

router.route('/post/edit-post').patch(editPost)

module.exports = router;