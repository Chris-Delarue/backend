const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MaskData = require('maskdata');
const UserRepository = require('../repository/user');
require('dotenv').config();

let userRepository = new UserRepository();

exports.signup = (req, res, next) =>{
     
        const emailMask2Options = {
            maskWith: "*", 
            unmaskedStartCharactersBeforeAt: 0,
            unmaskedEndCharactersAfterAt: 0,
            maskAtTheRate: false
        };
        const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);

        let email = maskedEmail;
        let firstname = req.body.firstname;
        let surname = req.body.surname;
        let password = req.body.password;

        bcrypt.hash(password, 10)
            .then(hash => {
                let mysqlInsert = [email, firstname, surname, hash];
                userRepository.signup(mysqlInsert)
               
                .then((response) => {
                    res.status(201).json(JSON.stringify(response));
                    
                })
                .catch((error) => {
                    console.error(error);
                    res.status(400).json({error});
                });   
            })
            .catch(error => res.status(500).json(
            error));
};

exports.login =  (req, res, next) => {
 
    const emailMask2Options = {
        maskWith: "*", 
        unmaskedStartCharactersBeforeAt: 0,
        unmaskedEndCharactersAfterAt: 0,
        maskAtTheRate: false
    }
    
    const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);

   let email = maskedEmail;
   let password = req.body.password;
   let mysqlInsert = [email];
   userRepository.login(mysqlInsert, password)
   
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
         })
        .catch((error) => {
            res.status(400).json( {error: 'ooppss'});
        });

};

exports.deleteAccount = (req, res, next) => {

    //let userId = req.params.userId;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); 
    const userId = decodedToken.userId;
    
    let mysqlInsert = [userId];
    
    userRepository.deleteAccount(mysqlInsert)
   
    .then((response) => {
        res.status(200).json(JSON.stringify(response));
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json(error);
    });
};