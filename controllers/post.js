
const db = require('../db_connect');
const jwt = require('jsonwebtoken');
const PostRepository = require('../repository/post');
require('dotenv').config();


let postRepository = new PostRepository();



exports.getAllPost = (req, res, next) => {

    postRepository.getAllPost()
    .then((response) => {
        res.status(200).json(JSON.stringify(response));
    });
};

exports.newPost = (req, res, next) => {

    let userId = req.body.userId;
    let title = req.body.title;
    let content = req.body.content;
    let createdAt = req.body.createdAt;
    let mysqlInsert = [userId, title, content, createdAt];
    postRepository.newPost(mysqlInsert)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        });
}
    

exports.getOnePost = (req, res, next) => {

    postRepository.getOnePost()
    .then((response) => {
        res.status(200).json(JSON.stringify(response));
    });
};

exports.deletePost = (req, res, next) =>{

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    let postId = req.params.id;
    let mysqlInsert1 = [postid];
    let mysqlInsert2 = [postId, userId];
    postRepository.deletePost(mysqlInsert1, mysqlInsert2)
    .then((respnse) => {
        res.status(200).json(JSON.stringify(response));
    });
    
};

exports.modifyPost = (req, res, next) => {
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    let title = req.body.title;
    let content = req.body.content;
    let postId = req.params.id;
    let mysqlInsert1 = [postId];
    let mysqlInsert2 = [title, content, postId, userId];
    postRepository.modifyPost(mysqlInsert1, mysqlInsert2)
    .then((response) => {
        res.status(201).json(JSON.stringify(response));
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(JSON.stringify(error));
    });
};








