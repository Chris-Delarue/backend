const db = require('../db_connect');
const mysql = require('mysql');

class PostRepository {
    constructor() {
        console.log('hello')
    }
    getAllPost(){
        let mysql = `SELECT post.userId, post.title, post.content, post.createdAt, users.firstname, users.surname,  FROM post JOIN users ON post.userId = userId ORDER BY post.createdAt DESC`;
        return new Promise((resolve) => {
            db.query(mysql, (error, result, fields) => {
                if(error) throw error;
                resolve(result)
            })
        })
    }





}