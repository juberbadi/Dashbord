const db_connection = require('../models/dbConnection').promise();
exports.deleteUser = async (req, res, next) => {

    try {
  
      const [row] = await db_connection.execute(
          "DELETE FROM `users` WHERE `id`=?",
          [req.params.id]
      );
  
      if (row.affectedRows === 0) {
        return res.status(404).json({
          message: "Invalid user ID (No User Found!)",
        });
      }
  
      res.status(200).json({
        message: "The user has been deleted successfully.",
      });
      
    } catch (err) {
      next(err);
    }
  
  };