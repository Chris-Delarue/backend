
const PostRepository = require('../repository/post');
require('dotenv').config();
const fs = require('fs');

let postRepository = new PostRepository();

exports.getAllPost = (req, res, next) => {
   
    postRepository.getAllPost()
    .then( (response) => {
        res.status(200).json(response);
       
    }) 
    .catch((error) => {
        res.status(500).json(error) ;   
    });
};

exports.newPost = (req, res, next) => {
   
    let userId = res.locals.userId;
    let title = req.body.title;
    let content = req.body.content;
    let imageurl = null;
    if(req.file) {
        imageurl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    
   let mysqlInsert = [userId, title, content, imageurl];

    postRepository.newPost(mysqlInsert)
    .then((response) => {
        res.status(201).json(response); 
    })
    .catch((error) => {
        res.status(500).json(error);
    });
}
    
exports.getOnePost = (req, res, next) => {

    let postId = req.params.postId;
   
    let mysqlInsert = [postId];
    postRepository.getOnePost(mysqlInsert)
    .then((response) => { 
        res.status(200).json(response);
       
    })
    .catch((error) => {
        res.status(500).json(error);
    });
};

exports.deletePost = (req, res, next) =>{

    let postId = req.params.postId;
    let userId = res.locals.userId; 
    let isAdmin = res.locals.isAdmin;
    
    postRepository.getOnePost(postId) 

    .then((response) => {

        let imageurlNew = response[0].imageurl;
        if(imageurlNew != "") {
            const image = imageurlNew.split('/images/')[1]; 
                fs.unlink(`images/${image}`, ()=> {
                });
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    }); 
        
    let mysqlInsert1 = [postId];
    let mysqlInsert2 = [postId, userId];
    postRepository.deletePost(mysqlInsert1, mysqlInsert2, isAdmin)
    
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
};
    

exports.modifyPost = (req, res, next) => {

        let title = req.body.title;
        let content = req.body.content;
        let postId = req.params.postId;
        let userId = res.locals.userId;
        let isAdmin = res.locals.isAdmin;
        
    postRepository.getOnePost(postId)

        .then((response) =>{ 
        
        let imageurlOld = response[0].imageurl;

            const postObject = req.file ? {
                ...req.body,
                imageurl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : {
                ...req.body};
              
            if(postObject.imageurl) {
                if(imageurlOld) {
                const image = imageurlOld.split('/images/')[1];
                fs.unlink(`images/${image}`, ()=> {
                })
                }
                 imageurl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
            }
            
            let mysqlInsert1 = [postId];
            let mysqlInsert2 = [title, content,   imageurl, postId, userId];
            
            postRepository.modifyPost( mysqlInsert1, mysqlInsert2, isAdmin)
            
            .then((response) => {
            
            res.status(201).json(response);
            })
            .catch((error) => {
            res.status(500).json(error);
            })
         })  
            .catch((error) => {
            res.status(500).json(error);
            })       
};

exports.newComment = (req, res, next) => {

    let postId = req.body.postId;
    let userId = res.locals.userId;
    let content = req.body.content;
    let mysqlInsert = [postId, userId, content];
    
    postRepository.newComment(mysqlInsert)
    .then((response) => {
        res.status(201).json(response);
    })
    .catch((error) => {
        res.status(500).json(error) ;   
    });
};

exports.getComment = (req, res, next) => {

    let postId = req.params.postId;
    let mysqlInsert = [postId];
    postRepository.getComment(mysqlInsert)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        res.status(500).json(error) ;   
    });
};

exports.deleteComment = (req, res, next) => {
    
    let commentId = req.params.commentId;
    let userId = res.locals.userId;
    let isAdmin = res.locals.isAdmin;
    let mysqlInsert1 = [commentId];
    let mysqlInsert2 = [commentId, userId];

    postRepository.deleteComment(mysqlInsert1, mysqlInsert2, isAdmin)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((error) => {
        res.status(500).json(error) ;   
    });
};







