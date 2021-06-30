

const CommentRepository = require('../repository/comment');

let commentRepository = new CommentRepository();

exports.newComment = (req, res, next) => {

    let postId = req.body.postId;
    let userId = req.body.userId;
    let content = req.body.content;
    let mysqlInsert = [postId, userId, content];

    commentRepository.newComment(mysqlInsert)
    .then((response) => {
        res.status(201).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error);   
    });
};

exports.getComment = (req, res, next) => {

   let commentId = req.params.commentId;
   let mysqlInsert = [commentId];

    commentRepository.getComment(mysqlInsert)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error);   
    });
};

exports.deleteComment = (req, res, next) =>{
    
    let commentId = req.params.commentId;
    let userId = req.body.userId;
    
    let mysqlInsert1 = [commentId];
    let mysqlInsert2 = [commentId, userId];

    commentRepository.deleteComment(mysqlInsert1, mysqlInsert2)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error);   
    });
};
