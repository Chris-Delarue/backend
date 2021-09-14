const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');

router.get('/',             auth,   postCtrl.getAllPost);
router.post('/',            auth,   postCtrl.newPost);
router.get('/:postId',      auth,   postCtrl.getOnePost);
router.delete('/:postId',   auth,   postCtrl.deletePost);
router.put('/:postId',      auth,   postCtrl.modifyPost);

router.get('/:postId/comment',          auth,   postCtrl.getComment);
router.post('/:postId/comment',         auth,   postCtrl.newComment);
router.delete('/comment/:commentId',    auth,   postCtrl.deleteComment);

module.exports = router;