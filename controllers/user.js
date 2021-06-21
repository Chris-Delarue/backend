const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const db = require('../db_connect');
require('dotenv').config();



exports.signup = (req, res, next) =>{
     
    
     const emailMask2Options = {
            maskWith: "*", 
            unmaskedStartCharactersBeforeAt: 0,
            unmaskedEndCharactersAfterAt: 0,
            maskAtTheRate: false
        };
       
        const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);

            db.query(`SELECT * FROM users WHERE email='${maskedEmail}' `,(error, results, rows) =>{
                if(results.length > 0) {
                    res.status(401).json({error :'Email non disponible'
                });
                }else{
                bcrypt.hash(req.body.password, 10)
                .then(hash => {

                db.query(`  INSERT INTO users VALUES (NULL, '${maskedEmail}', '${req.body.firstname}', '${req.body.surname}', '${hash}', 0)`, (error, results, fields)=> {
                if(error){
                    return res.status(404).json({error});
                }
                    return res.status(201).json({
                       message :'Bienvenue sur notre reseau!!'
                    });
                } 
            );
        })
        .catch(error => res.status(500).json({
            error
        }));
    }
    });
};

exports.login = (req, res, next) => {
 
    const emailMask2Options = {
        maskWith: "*", 
        unmaskedStartCharactersBeforeAt: 0,
        unmaskedEndCharactersAfterAt: 0,
        maskAtTheRate: false
    }
    
    const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);

   db.query(`SELECT * FROM users WHERE email='${maskedEmail}'`,(error, results, rows) => {
        if (results.length > 0) {
    
    
        bcrypt.compare(req.body.password, results[0].password)
        .then(valid => {
            if(!valid){
                return res.status(404).json({error: 'Veuillez vérifier votre émail et/ou votre mot de passe !'});
            }else {
                res.status(200).json({
                userId : results[0].userId,
                firstname : results[0].firstname,
                surname : results[0].surname,
                isAdmin : results[0].isAdmin,
                token: jwt.sign(
                {userId: results[0].userId,
                },
                process.env.TOKEN_SECRET,
                {
                expiresIn: '900s'
                })
            });
        }
        });
        }else{
                res.status(404).json({
                message: 'Utilisateur non trouvé!!'
                 });
            }
        }
   );
};

exports.deleteAccount = (req, res, next) => {
    db.query(`DELETE FROM users WHERE userId = ${req.params.userId}`, (error, result, field) => {
        if(error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};