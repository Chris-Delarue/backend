const db = require('../db_connect');

const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

class UserRepository {
    constructor() {
        console.log('Hello');
    }

    signup(mysqlInsert) {
        let mySql = ` 
        INSERT INTO users (userId, email,emailHash, firstname, surname, password, passwordConfirm, isAdmin) 
        VALUES(NULL, ?, ?, ?, ?, ?, ?, 0) `; 
        mySql = mysql.format(mySql, mysqlInsert);
     
        return new Promise((resolve, reject) => {
            db.query(mySql, (error, result) => {
                
                if(error) {
                    reject({error : 'Une erreur est survenue !'});
                }else{
                    resolve({ message: 'Bienvenue sur votre réseau!!'});
                }
            });
        });
    }
    
    login(mysqlInsert, password) {
        let mySql = `
        SELECT * FROM users 
        WHERE emailHash = ? `;
        mySql = mysql.format(mySql, mysqlInsert);
        
        return new Promise((resolve, reject) => {
            db.query(mySql, (error, result) => {

            if(error) reject(error);

            if(!result[0]) {
                reject({ error: 'Opps nous ne vous avons pas trouvé!!'});
            }else {
                bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if(!valid) return reject({ message: 'Veuillez vérifier votre émail et/ou votre mot de passe !'});

                    resolve({
                        userId : result[0].userId,
                        firstname : result[0].firstname,
                        surname : result[0].surname,
                        isAdmin : result[0].isAdmin,
                        token: jwt.sign(
                        {
                        userId: result[0].userId, 
                        isAdmin: result[0].isAdmin
                        
                        },
                        process.env.TOKEN_SECRET,
                        {
                        expiresIn: '2h'
                        })
                    });
                })
                .catch(error => reject({error }));
                }
            });
        });
    }
    
    deleteAccount(mysqlInsert) {
        let mySql = `
        DELETE FROM users 
        WHERE userId = ?`;
        mySql = mysql.format(mySql, mysqlInsert);
        return new Promise((resolve, reject) => {
            db.query(mySql, (error, result) => {
                if(error) return reject ({ error : 'opppss something went wrong!!'});
                resolve({ message : 'Nous vous avons supprimé!!'});
            });
        });
    }
}

module.exports = UserRepository;