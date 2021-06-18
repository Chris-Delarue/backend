const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/post');

router.get('/',auth,   userCtrl.getAllPost);
router.post('/', auth, userCtrl.newPost);
router.get('/:userId', auth,userCtrl.getOnePost);
router.delete('/:userId', auth,  userCtrl.deleteOnePost);
//router.put('/:userId',  auth,userCtrl.modifyOnePost);
//router.get('/user:userId/post', auth, userCtrl.getUserPost);


module.exports = router;