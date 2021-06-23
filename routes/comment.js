const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/comment');

router.get('/:userId/comment', auth, userCtrl.getComment);
router.post('/:userId/comment', auth, userCtrl.newComment);
router.delete('/comment/:userId', auth,  userCtrl.deleteComment);

module.exports = router;