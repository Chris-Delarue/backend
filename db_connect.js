
const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
    
  });
  
  db.connect(function(error) {
    if (error) {
        return console.log({error: 'opps'});
    }
    console.log("Connecté à la base de données MySQL!");
    
  });

 
  module.exports = db;