const db = require('../db_connect');
const mysql = require('mysql');

class PostRepository {
    constructor() {
        console.log('hello');
    }
    getAllPost(){
        let mySql = `
        SELECT 
        post.postId, post.userId, post.title, post.content, post.createdAt, users.firstname, users.surname  
        FROM post 
        JOIN users ON post.userId = users.userId 
        ORDER BY post.createdAt DESC`;
        return new Promise((resolve) => {
            db.query(mySql, (error, result, fields) => {
                if(error) throw error;
                resolve(result);
            });
        });
    }
    getOnePost(mysqlInsert){
        let mySql = `
        SELECT * FROM post 
        WHERE postId = ?` ;
        mySql = mysql.format(mySql, mysqlInsert);
        return new Promise((resolve) => {
            db.query(mySql, (error, result, fields) => {
                if(error) throw error;
                resolve(result);
            });
        });
    }
    newPost(mysqlInsert){
        let mySql = `
        INSERT INTO post (postId, userId, title, content, createdAt)
        VALUES (NULL,?,?,?,NOW())`;
        mySql = mysql.format(mySql, mysqlInsert) ;
        console.log(mySql)
            return new Promise((resolve) => {
                db.query(mySql, (error, result, fields) => {
                    if(error) throw error;
                    resolve({ message :'Nouveau post crée !'});
                });
            
            });
    }
    modifyPost(mysqlInsert1, mysqlInsert2) {
        let mySql1 = `
        SELECT * FROM post 
        WHERE postId=?`;
        mySql1 = mysql.format(mySql1, mysqlInsert1);
        return new Promise((resolve, reject) => {
            db.query(mySql1, (error, result, fields)=> {
                if(error) throw error;
                if(mysqlInsert2[3] == result[0].userId) {
                    let mySql2 = `
                    UPDATE post SET title = ?, content =? 
                    WHERE postId =? AND userId =?`;
                    mySql2 = mysql.format(mySql2, mysqlInsert2);
                    db.query(mySql2, (error, result, fields) =>{
                        if(error) throw error;
                        resolve({ message : 'Post modifié!'});
                    });
                }else{
                    reject({ error : 'opps pas modifié !!!'});

                }
            });
        });
    }
    
    deletePost(mysqlInsert1, mysqlInsert2) {
        let mySql1 = `
        SELECT * FROM post 
        WHERE postId = ?`;
        mySql1 = mysql.format(mySql1, mysqlInsert1);
        return new Promise((resolve, reject) => {
            db.query(mySql1, (error, result, fields) => {
                if(error) throw error ;
                if(mysqlInsert2[1] == result[0].userId) {
                    
                    let mySql2 = `
                    DELETE FROM post 
                    WHERE postId =? AND userId =? ` ;
                    mySql2 = mysql.format(mySql2, mysqlInsert2);
                    db.query(mySql2, (error, result, fields)=> {
                    if(error) throw error;
                    resolve({ message: 'Post supprimé !!'});
                 }); 
                }else{
                    reject({error: 'Oppss post non supprimé !!'});
                }
            });
        });
    }

    newComment(mysqlInsert) {
        let mySql = `
        INSERT INTO comment (commentId, postId, userId, content, createdAt) 
        VALUES (NULL,?,?,?,NOW())`;
        mySql = mysql.format(mySql, mysqlInsert);
        console.log(mySql)
        return new Promise((resolve) => {
            db.query(mySql, (error, result, fields) => {
                if (error) throw error;
                resolve({ message : 'Merci pour votre commentaire!!'});
            });
        });
    }
    getComment(mysqlInsert){
        let mySql = `
        SELECT users.firstname, users.surname, comment.commentId,comment.postId,  comment.content, comment.userId, comment.createdAt 
        FROM comment 
        JOIN users ON users.userId = comment.userId 
        WHERE comment.postId = ? 
        ORDER BY comment.createdAt DESC`;
        mySql = mysql.format(mySql, mysqlInsert);
        return new Promise((resolve) => {
            db.query(mySql, (error, result, fields) => {
                if (error) throw error;
                resolve(result);
            });
        });
    }
    deleteComment(mysqlInsert1, mysqlInsert2) {
        let mySql1 = `
        SELECT * FROM comment 
        WHERE commentId = ?`;
        mySql1 = mysql.format(mySql1, mysqlInsert1);
        return new Promise((resolve, reject) => {
            db.query(mySql1, (error, result, fields) => {
                if(error) throw error;
                if(mysqlInsert2[1] == result[0].userId) {
                    let mySql2 = `
                    DELETE FROM comment 
                    WHERE commentId = ? AND userId = ?`;
                    mySql2 = mysql.format(mySql2, mysqlInsert2);
                    
                        db.query(mySql2, mysqlInsert2);
                        if(error) throw error;
                        resolve({ message : 'commentaire supprimé'});
                }else{
                    reject({error : "oppsss"});
                }
            });
        });
    }

}

module.exports = PostRepository;