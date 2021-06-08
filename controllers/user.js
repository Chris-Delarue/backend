const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');


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
            //récupération du mdp hashé de bcrypt
            password: hash
           
        });  console.log(user)
        //enregistrement de User dans BDD
        user.save()
        .then(() => res.status(200).json({message: 'Utilisateur crée !'}))
        .catch(error => {
            console.log(error)
            res.status(500).json({error})
        } );
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
