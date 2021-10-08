
const PostRepository = require('../repository/post');
require('dotenv').config();


let postRepository = new PostRepository();



exports.getAllPost = (req, res, next) => {

    postRepository.getAllPost()
    .then( (response) => {
        res.status(200).json(response);
       console.log(response)
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error) ;   
    });
};

exports.newPost = (req, res, next) => {

    let userId = res.locals.userId;
    let title = req.body.title;
    let content = req.body.content;
   
   let mysqlInsert = [userId, title, content];

    postRepository.newPost(mysqlInsert)
    .then((response) => {
        res.status(201).json(response);
        console.log(response);
    })
    .catch((error) => {
           
        res.status(400).json(error);
        console.log('oulala!!');
    });
}
    

exports.getOnePost = (req, res, next) => {

    let postId = req.params.postId;
    let userId = res.locals.userId;
    let title = req.body.title;
    let content = req.body.content;
    let mysqlInsert = [postId, userId, title, content];
    postRepository.getOnePost(mysqlInsert)
    .then((response) => {
         console.log(response);
        res.status(200).json(response);
       
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error);
    });
};

exports.deletePost = (req, res, next) =>{

    let postId = req.params.postId;
    let userId = res.locals.userId;
    let mysqlInsert1 = [postId];
    let mysqlInsert2 = [postId, userId];
    console.log(mysqlInsert2)
    postRepository.deletePost(mysqlInsert1, mysqlInsert2)
    
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error);
    });
};
    

exports.modifyPost = (req, res, next) => {
    

    let title = req.body.title;
    let content = req.body.content;
    let postId = req.params.postId;
    let userId = res.locals.userId;
    let mysqlInsert1 = [postId];
    let mysqlInsert2 = [title, content, postId, userId];
    postRepository.modifyPost(mysqlInsert1, mysqlInsert2)
    .then((response) => {
        res.status(201).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error);
    });
};

exports.newComment = (req, res, next) => {

    let postId = req.body.postId;
    let userId = res.locals.userId;
    let content = req.body.content;
    let mysqlInsert = [postId, userId, content];
    
    postRepository.newComment(mysqlInsert)
    .then((response) => {
        console.log(response)
        res.status(201).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error) ;   
    });
};

exports.getComment = (req, res, next) => {

    let postId = req.params.postId;
    let mysqlInsert = [postId];
    postRepository.getComment(mysqlInsert)
    .then((response) => {
        res.status(200).json(response);
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error) ;   
    });
};


exports.deleteComment = (req, res, next) => {
    
    let commentId = req.params.commentId;
    let userId = res.locals.userId;
    let mysqlInsert1 = [commentId];
    let mysqlInsert2 = [commentId, userId];
    console.log()

    postRepository.deleteComment(mysqlInsert1, mysqlInsert2)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error) ;   
    });
};







