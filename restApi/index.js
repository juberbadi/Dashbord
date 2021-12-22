const express = require('express');
const routes = require('./routes/route');
const app = express();
var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(routes);



// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});




//file uploading
global.__basedir = __dirname;

// var corsOptions = {
//   origin: "http://localhost:4200"
// };

// app.use(cors(corsOptions));

// const initRoutes = require("./routes");

// app.use(express.urlencoded({ extended: true }));
// initRoutes(app);

app.listen(3000,() => console.log('Server is running on port 3000'));