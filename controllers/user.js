const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const db = require('../db_connect');
require('dotenv').config();

const User = require('../models/user');

//middleware creation nouvel User

exports.signup = (req, res, next) =>{
     
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      
     const emailMask2Options = {
            maskWith: "*", 
            unmaskedStartCharactersBeforeAt: 0,
            unmaskedEndCharactersAfterAt: 0,
            maskAtTheRate: false
        }
       
        const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);

        const user = new User({

            //on passe email trouvé dans le corps de la requête
            email:maskedEmail,
            firstname: req.body.firstname,
            surname: req.body.surname,
            password: hash,
            isAdmin : req.body.isAdmin
        });
            db.query(`INSERT INTO users SET ?`, user,  function(error, results, fields){
                if(error){
                    res.status(400).json({error :'error'});
                }
            db.query(`SELECT * FROM users WHERE email = ?`, [maskedEmail], function(error, results, fields) {
                if(error){
                    res.status(404).json({error});
                }
                    res.status(201).json({
                        userId : results[0].id,
                        isAdmin : results[0].isAdmin,
                        token: jwt.sign(
                            {userId: results[0].id,
                            isAdmin : results[0].isAdmin},
                            process.env.TOKEN_SECRET,
                            {
                            expiresIn: '24h'
                        })
                    });
            });
        });
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
 
    const emailMask2Options = {
        maskWith: "*", 
        unmaskedStartCharactersBeforeAt: 0,
        unmaskedEndCharactersAfterAt: 0,
        maskAtTheRate: false
    }
    
    const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);

   db.query(`SELECT * FROM users WHERE email= ? `, [maskedEmail], function(error, results, fields) {
        if (results.length === 0) {
             return res.status(401).json({error: 'Utilisateur non trouvé !'});
        }
  
        bcrypt.compare(req.body.password, results[0].password)
        .then(valid => {
            if(!valid){
                return res.status(404).json({error: 'Veuillez vérifier votre émail et/ou votre mot de passe !'});
            }
           res.status(200).json({
            userId : results[0].id,
            isAdmin : results[0].isAdmin,
            token: jwt.sign(
                {userId: results[0].id,
                isAdmin : results[0].isAdmin},
                process.env.TOKEN_SECRET,
                {
                expiresIn: '900s'
                })
            });
        })
        .catch(error => res.status(500).json({error}));
    });
};