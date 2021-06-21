const db = require('../db_connect');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserRepository {
    constructor() {
        console.log('Hello');
    }

    signup(mysqlInsert) {
        let sql = 'INSERT INTO users VALUES(NULL,?,?,?,?,?)';
        sql = mysql.format(sql, mysqlInsert);
        return new Promise((resolve, reject) => {
            db.query(sql, (error, result) =>{
                if(error) reject({error : 'Email non disponible'});
                resolve({ message: 'Bienvenue sur notre reseau!!'});
            });
        });

    }
    login(mysqlInsert, password) {
        let sql = 'SELECT * FROM users WHERE email = ?';
        sql = mysql.format(sql, mysqlInsert);
        return new Promise((resolve, reject) => {
            if(error) reject({ error});
            if(!result[0]) {
                reject ({ error: 'Opps nous vous avons pas trouvé!!'});
            }else {
                bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if(!valid) return reject({ error: 'Veuillez vérifier votre émail et/ou votre mot de passe !'});
                    resolve({
                        userId : result[0].userid,
                        firstname : results[0].firstname,
                        surname : results[0].surname,
                        
                        token: jwt.sign(
                        {userId: results[0].userId,
                        },
                        process.env.TOKEN_SECRET,
                        {
                        expiresIn: '900s'
                        })
                    });
                })
                .catch(error => reject({ error }));
            }
        })
    }
    deleteAccount(mysqlInsert) {
        let mysql = '   DELETE FROM users WHERE id=?';
        sql = mysql.format(sql, mysqlInsert)
        return new Promise((resolve, reject) => {
            db.query(sql, (error, result) => {
                if(error) return ({ error : 'opppss womething went wrong!!'});
                resolve({ message : 'Nous vous avons trouvé!!'})
            });
        });
    }
}

module.exports = UserRepository;