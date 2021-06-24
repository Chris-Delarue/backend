const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

router.get('/:userId/comment',      auth,   commentCtrl.getComment);
router.post('/:userId/comment',     auth,   commentCtrl.newComment);
router.delete('/comment/:userId',   auth,   commentCtrl.deleteComment);

module.exports = router;