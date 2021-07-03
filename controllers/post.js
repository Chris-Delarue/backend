

const PostRepository = require('../repository/post');


let postRepository = new PostRepository();

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

   
   let mysqlInsert = [userId, title, content];

    postRepository.newPost(mysqlInsert)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        });
}
    

exports.getOnePost = (req, res, next) => {


    postRepository.getOnePost()

    let userId = req.body.userId;
    let title = req.body.title;
    let content = req.body.content;
    let mysqlInsert = [userId, title, content];
    postRepository.getOnePost(mysqlInsert, req)

    .then((response) => {
        res.status(200).json(JSON.stringify(response));
    });
};

exports.deletePost = (req, res, next) =>{

    let postId = req.params.id;
    let mysqlInsert1 = [postid];
    let mysqlInsert2 = [postId, userId];
    postRepository.deletePost(mysqlInsert1, mysqlInsert2)
    .then((respnse) => {
        res.status(200).json(JSON.stringify(response));
    });
    
};

exports.modifyPost = (req, res, next) => {
    
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

    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(JSON.stringify(errot));
    })
};









