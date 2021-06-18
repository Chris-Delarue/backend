
const db = require('../db_connect');

exports.getAllPost = (req, res, next) => {

    db.query(`SELECT users.firstname, users.surname, post.userId, post.title, post.content, post.createdAt FROM users INNER JOIN post on users.id = post.userId` , (error, result, field) => {
        if(error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};

exports.newPost = (req, res, next) =>
    db.query(`INSERT INTO post VALUES (NULL, '${req.body.userId}','${req.body.title}','${req.body.content}',NOW())`, (error, result, field) => {
        if(error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(201).json({
            message: 'Super votre post à été publié !'
        });
    });

exports.getOnePost = (req, res, next) => {
    db.query(`SELECT * FROM post WHERE post.userId = ${req.params.userId}`, (error,result,field) => {
        if(error) {
            return res.status(400).json({
                    error: "opps"
            });
        }
        return res.status(200).json(result);
    });
};

exports.deleteOnePost = (req, res, next) =>{
    db.query(`DELETE FROM post WHERE post.userId= ${req.params.userId}`, (error, result, field) =>{
        if(error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};

exports.modifyOnePost = (req, res, next) => {
    db.query(`UPDATE post SET title = '${req.body.title}', content = '${req.body.content}' WHERE post.userId = ${req.params.userId}'`, (error, result, field) => {
        if(error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};

exports.getUserPost= (req, res, next) => {
    db.query(`SELECT * FROM post WHERE post.userId = ${req.params.userId}`, (error, result, field) => {
        if(error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};






