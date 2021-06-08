
const mysql = require('mysql');
require('dotenv').config();

const db = mysql.creationConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
    
  });
  
  db.connect(function(error) {
    if (error) {
        return console.error('error');
    }
    console.log("Connecté à la base de données MySQL!");
    db.query('SELECT * FROM users.utilisateurs', function (error, result){
        if(error) throw error;
            console.log(result);
        
    })
   
  });

 
  module.exports = db;