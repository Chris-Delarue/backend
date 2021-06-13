const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const db = require('../db_connect');

require('dotenv').config();

<<<<<<< HEAD
const User = require('../models/users');
=======
//const User = require('../models/user');
>>>>>>> 3b9e24571105683f63efc9b793aca4202964d7cc

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

        const user = new User( {

            email:maskedEmail,
            firstname: req.body.firstname,
            surname: req.body.surname,
            password: hash
<<<<<<< HEAD
          
        },
            db.query(' INSERT INTO users SET ?', users, function(error, results, rows){
                if(error){
                    res.status(400).json({error :'error'});
                }else{
                    res.status(201).json({message : "Utilisateur crée !"});
                }
            })
        ); console.log(user)
=======
           
        },
            db.query(' INSERT INTO utilisateur SET ?', users, function(error, results, rows){
                if(error){
                    res.status(400).json({error :'error'});
                }else{
                    res.status(200).json({message : "Utilisateur crée !"});
                }
            })
        ); 
>>>>>>> 3b9e24571105683f63efc9b793aca4202964d7cc
       
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

    User.findOne( {
        email : maskedEmail
      
    })
    .then(user => {
        if(!user){
           
            return res.status(401).json(
                {error: 'Utilisateur non trouvé !'}
          );
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(404).json({error: 'Veuillez vérifier votre émail et/ou votre mot de passe !'});
            }
           res.status(200).json({
                userId : user._id,
                token: jwt.sign(
                    {userId: user._id},
                    process.env.TOKEN_SECRET,
                    {
                    expiresIn: '900s'
                })
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error=> res.status(500).json({error}));
};
