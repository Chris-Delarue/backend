const db = require('../db_connect');
const mysql = require('mysql');

class PostRepository {
    constructor() {
        console.log('hello');
    }
    getAllPost(){
        let mysql = `SELECT post.userId, post.title, post.content, post.createdAt, users.firstname, users.surname,  FROM post JOIN users ON post.userId = userId ORDER BY post.createdAt DESC`;
        return new Promise((resolve) => {
            db.query(mysql, (error, result, fields) => {
                if(error) throw error;
                resolve(result);
            });
        });
    }
    getOnePost(){
        let mysql = `SELECT * FROM post WHERE post.userId = ?`;
        return new Promise((resolve) => {
            db.query(mysql, (error, result, fields) => {
                if(error) throw error;
                resolve(result);
            });
        });
    }
    newPost(mysqlInsert){
        let mysql = `INSERT INTO post VALUES('NULL,?,?,?,NOW())`;
        mysql = mysql.format(mysql, mysqlInsert) ;
            return new Promise((resolve) => {
                db.query(mysql, (error, result, fields) => {
                    if(error) throw error;
                    resolve({ message :'Nouveau post crée !'})
                });
            
            });
    }
    modifyPost(mysqlInsert1, mysqlInsert2) {
        let mysql1 = `SELECT * FROM post WHERE userId=?`;
        mysql1 = mysql.format(mysql1, mysqlInsert1);
        return new Promise((resolve) => {
            db.query(myqsl1, (error, resuilt, fields)=> {
                if(error) throw error;
                if(mysql2[3] == result[0].userId) {
                    let mysql2 = `  UPDATE post SET title = ?, content =? WHERE postId =? AND userId =?`;
                    mysql2 = mysql.format(mysql2, mysqlInsert2);
                    db.query(mysql2, (error, result, fields) =>{
                        if(error) throw error;
                        resolve({ message : 'Post modifié!'});
                    })
                }else{
                    reject({ error});

                }
            });
        });
    }
    deletePost(mysqlInsert1, mysqlInsert2) {
        let mysql1 = `SELECT * FROM post WHERE userId= ?`;
        mysql1 = mysql.format(mysql1, mysqlInsert1);
        return new Promise((resolve, reject) => {
            db.query(mysql1, (error, result, fields) => {
                if(error) throw error ;
                if(sqlinsert2[1] == result[0].userid) {
                    let mysql2 = `DELETE FROM post  WHERE postId =? AND userid =?`;
                    sql2 = mysql.format(mysql2, mysqlInsert2);
                    db.query(mysql2, mysqlInsert2);
                    if(error) throw error;
                    resolve({ message: 'Post supprimé !'});
                }else{
                    reject({error});
                }
            });
        });
    }

}