const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const UserRepository = require('../repository/user');
require('dotenv').config();

let userRepository = new UserRepository();

exports.signup = (req, res, next) =>{
     
        let emailCrypted = CryptoJS.AES.encrypt(req.body.email, process.env.SECRET_PHRASE).toString();
        let emailHash = CryptoJS.MD5(req.body.email).toString();
        let firstname = req.body.firstname;
        let surname = req.body.surname;
        let password = req.body.password;
        let passwordConfirm = req.body.passwordConfirm;
       
            if(password === passwordConfirm)
             {
            bcrypt.hash(password, 10)
            .then(hash => {
                let mysqlInsert = [emailCrypted, emailHash, firstname,  surname, hash, hash];
               
                userRepository.signup(mysqlInsert)
               
                .then((response) => {
                    res.status(201).json(response);
                    
                })
                .catch((error) => {
                    res.status(400).json(error);
                
                });
            })
            .catch((error) => res.status(500).json(error));
        }
        
        
};

exports.login =  (req, res, next) => {
 
    let emailHash = CryptoJS.MD5(req.body.email).toString();
    
   let email = emailHash ;
   let password = req.body.password;
   let mysqlInsert = [email];

   userRepository.login(mysqlInsert, password)
   
        .then((response) => {
            res.status(200).json(response);
           console.log(response);
         })
        .catch((error) => {
            res.status(400).json(error);
        });
};

exports.deleteAccount = (req, res, next) => {

    let mysqlInsert = req.params.userId;

    userRepository.deleteAccount(mysqlInsert)
    
    .then((response) => {
        res.status(200).json(response);
        console.log(response)
    })
    .catch((error) => {
        res.status(400).json(error);
        console.log(error);
    });
};