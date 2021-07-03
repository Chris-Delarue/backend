const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');


router.get('/:commentId',       auth,   commentCtrl.getComment);
router.post('/;commentID',      auth,   commentCtrl.newComment);
router.delete('/:commentId',    auth,   commentCtrl.deleteComment);


module.exports = router;