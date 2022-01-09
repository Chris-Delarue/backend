const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const db = require('../db_connect.js');
require('dotenv').config(); 

module.exports =  (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); 
        const userId = decodedToken.userId ;
        const isAdmin = decodedToken.isAdmin;

        let mysqlInsert = [userId];
        
        let mySql = `
        SELECT COUNT(userId) as count 
        FROM users 
        WHERE userId=? `;
        mySql = mysql.format(mySql, mysqlInsert);
        
        db.query(mySql, (error, result) =>{

            if (error) {
                throw new Error({ error: 'oppps' });
            }
            if (result[0]['count'] != 1) {
               
                throw 'Le token n\'est pas valide';
            } 
            {
                res.locals.userId = userId;
                res.locals.isAdmin = isAdmin === 1;
                next();
            }
        })
        }catch {
            res.status(401).json({error : 'Requête non authentifiée !'});
        } 
};


