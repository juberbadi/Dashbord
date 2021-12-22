const db_connection = require('../models/dbConnection').promise();

exports.updateUser = async (req, res, next) => {
    try {
  
      const [row] = await db_connection.execute(
          "SELECT * FROM `users` WHERE `id`=?",
          [req.params.id]
      );
  
      if (row.length === 0) {
        return res.status(404).json({
          message: "Invalid User ID",
        });
      }
  
      if (req.body.name) row[0].name = req.body.name;
  
      if (req.body.email) row[0].email = req.body.email;

      if (req.body.phone) row[0].phone = req.body.phone;
  
      const [update] = await db_connection.execute(
        "UPDATE `users` SET `name`=?, `email`=?, `phone`=? WHERE `id`=?",
        [row[0].name, row[0].email, row[0].phone, req.params.id]
      );
  
      if (update.affectedRows === 1) {
        return res.json({
          message: "The User has been successfully updated.",
        });
      }
  
    } catch (err) {
      next(err);
    }
  
  };
  