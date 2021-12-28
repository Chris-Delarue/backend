const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

try{

router.get('/',                         auth,           postCtrl.getAllPost);
router.post('/',                        auth,   multer, postCtrl.newPost);
router.get('/:postId',                  auth,   multer, postCtrl.getOnePost);
router.delete('/:postId',               auth,           postCtrl.deletePost);
router.put('/:postId',                  auth,   multer, postCtrl.modifyPost);

router.get('/:postId/comment',          auth,   postCtrl.getComment);
router.post('/:postId/comment',         auth,   postCtrl.newComment);
router.delete('/comment/:commentId',    auth,   postCtrl.deleteComment);

} catch(error) {
    console.log(error);
}

module.exports = router;