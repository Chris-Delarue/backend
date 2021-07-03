
const jwt = require('jsonwebtoken');
const CommentRepository = require('../repository/comment');
require('dotenv').config();

let commentRepository = new CommentRepository();

exports.newComment = (req, res, next) => {

    let postId = req.body.postId;
    let userId = req.body.userId;
    let content = req.body.content;
    let mysqlInsert = [postId, userId, content];
    commentRepository.newComment(mysqlInsert)
    .then((response) => {
        res.status(201).json(JSON.stringify(response));
    });

    
};

exports.getComment = (req, res, next) => {

   let postId = req.body.postId;
   let mysqlInsert = [postId];
    commentRepository.getComment(mysqlInsert)
    .then((response) => {
        res.status(200).json(JSON.stringify(response));
    })
};

exports.deleteComment= (req, res, next) =>{
    
   
    let commentId = req.params.commentId;
    let mysqlInsert1 = [commentId];
    let mysqlInsert2 = [commentId, userId];
    commentRepository.deletePost(mysqlInsert1, mysqlInsert2)
    .then((response) => {
        res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(JSON.stringify(error)) ;   
    }) ;


