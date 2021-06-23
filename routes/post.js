const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');

router.get('/',auth,   postCtrl.getAllPost);
router.post('/', postCtrl.newPost);
router.get('/:userId', auth, postCtrl.getOnePost);
router.delete('/:userId', auth,  postCtrl.deletePost);
router.put('/:userId',  auth, postCtrl.modifyPost);



module.exports = router;