const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const db = require('../db_connect');
require('dotenv').config(); 

module.exports = (req, res, next) => {

    try{
       
        const token = req.headers.authorization.split(' ')[1];
     
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); 
        const userId = decodedToken.userId;
        let mysqlInsert = [userId];
        let mySql = 'SELECT COUNT(userId) FROM users WHERE userId = ?';
        mySql = mysql.format(mySql, mysqlInsert);
        db.query(mySql,(error, result)=>{
            if(error) reject({ error});
            if(result[0]['COUNT(userId)'] !== 1) {
                throw 'Le token n\'est pas valide';
            
        } else {
            next();    
        }
        });
    }
    catch 
    {
        res.status(401).json({error : new Error('Requête non authentifiée !')});
    }
};
