
const PostRepository = require('../repository/post');

let postRepository = new PostRepository();


exports.getAllPost = (req, res, next) => {

    postRepository.getAllPost()
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error) ;   
    });
};

exports.newPost = (req, res, next) => {

    let userId = req.body.userId;
    let title = req.body.title;
    let content = req.body.content;
    let mysqlInsert = [userId, title, content];

    postRepository.newPost(mysqlInsert)
    .then((response) => {
        res.status(201).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error) ;   
    });
};
    
exports.getOnePost = (req, res, next) => {

    let userId = req.body.userId;
    let title = req.body.title;
    let content = req.body.content;
    let mysqlInsert = [userId, title, content];

    postRepository.getOnePost(mysqlInsert, req)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error) ;   
    });
};

exports.deletePost = (req, res, next) => {

    let postId = req.params.postId;
    let userId = req.body.userId;
    let mysqlInsert1 = [postId];
    let mysqlInsert2 = [postId, userId];

    postRepository.deletePost(mysqlInsert1, mysqlInsert2)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error) ;   
    });
};

exports.modifyPost = (req, res, next) => {

    let title = req.body.title;
    let content = req.body.content;
    let postId = req.params.postId;
    let userId = req.body.userId;
    let mysqlInsert1 = [postId];
    let mysqlInsert2 = [title, content, postId, userId];

    postRepository.modifyPost(mysqlInsert1, mysqlInsert2)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error);
    });
};








