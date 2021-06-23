const db = require('../db_connect');

exports.newComment = (req, res, next) => {
    db.query(`INSERT INTO comment VALUES ( NULL, ${req.params.userId}, '${req.body.content}', NOW())`, (error, result, field)=>  {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
};

exports.getComment = (req, res, next) => {
    db.query(`SELECT users.userId, users.firstname, users.surname, comment.userId, comment.content, comment.createdAt FROM users INNER JOIN comment ON users.userId = comment.userId WHERE comment.postId = ${req.params.userId} ORDER BY comment.createdAt DESC`, (error, result, field) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result)
    });
};

exports.deleteComment= (req, res, next) =>{
    db.query(`DELETE FROM comment WHERE comment.userId = ${req.params.userId}`, (error, result, fiels) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result)
    });
};
