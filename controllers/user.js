const bcrypt = require('bcrypt');
const MaskData = require('maskdata');
const db = require('../db_connect');
const UserRepository = require('../repository/user');

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
        let passwordConfirm = req.body.passwordConfirm;

        if(password === passwordConfirm) {
        bcrypt.hash(password, 10)
            .then(hash => {
                let mysqlInsert = [email, firstname, surname, hash, hash] ;
                userRepository.signup(mysqlInsert)
               
                .then((response) => {
                    res.status(201).json(response);

        bcrypt.hash(password, 10)
            .then(hash => {
                let mysqlInsert = [email, firstname, surname, hash];
                userRepository.signup(mysqlInsert)
               
                .then((response) => {
                    res.status(201).json(JSON.stringify(response))
                    
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({error});
                }); 
                
            }) 
              .catch(error => res.status(500).json(
            error));
        }
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
        res.status(200).json(response);
    })
    .catch((error) => {
        res.status(400).json( {error: 'ooppss'});
    })
   
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
         })
        .catch((error) => {
            res.status(400).json( {error: 'ooppss'});
        });


};

exports.deleteAccount = (req, res, next) => {

    //let userId = req.params.userId;

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