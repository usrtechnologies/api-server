// CORS ERROR OPTION #1

const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:4200" && "*"
};

app.use(cors(corsOptions));

// CORS ERROR OPTION #2
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

## DEPLOYMENT STEP #3
*First change DB to Remote connection from db.config.js
* git add .
* git commit 
* git push
* git push heroku main

## To check heroku deployment log serve
heroku logs --tail

## Generate Postman Docs
Its Auto deploment bro

Credentials
username:shubhamankhub
id:shubham.ankhub@gmail.com
pass:Project@9370082321