// const jwt = require('jsonwebtoken');
// const conn = require('../models/dbConnection').promise();

// exports.getUser = async (req,res,next) => {

//     try{

//         if(
//             !req.headers.authorization ||
//             !req.headers.authorization.startsWith('Bearer') ||
//             !req.headers.authorization.split(' ')[1]
//         ){
//             return res.status(422).json({
//                 message: "Please provide the token",
//             });
//         }

//         const theToken = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

//         const [row] = await conn.execute(
//             "SELECT `id`,`name`,`email`,`phone` FROM `users` WHERE `id`=?",
//             [decoded.id]
//         );

//         if(row.length > 0){
//             return res.json({
//                 user:row[0]
//             });
//         }

//         res.json({
//             message:"No user found"
//         });

//     }
//     catch(err){
//         next(err);
//     }
// }

const db_connection = require("../config/dbConnection").promise();
exports.getUser = async (req, res, next) => {
  try {
    const [row] = await db_connection.execute(
      "SELECT `id`,`name`,`email`,`phone` FROM `users` WHERE `id`=?",
      [req.params.id]
    );

    if (row.length > 0) {
      return res.json({
        user: row[0],
      });
    }

    res.json({
      message: "No user found",
    });
  } catch (err) {
    next(err);
  }
};
