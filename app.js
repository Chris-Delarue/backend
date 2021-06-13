const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const path = require('path');
<<<<<<< HEAD
require('dotenv').config();

=======
const mysql = require('mysql');
const app = express();
>>>>>>> 3b9e24571105683f63efc9b793aca4202964d7cc
const limiter = rateLimit({
  windowsMs: 15*60*1000,
  max: 100
});
<<<<<<< HEAD
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');



app.use(limiter);



=======
//const postRoutes = require('./routes/post');
//const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

require('dotenv').config();

app.use(limiter);

>>>>>>> 3b9e24571105683f63efc9b793aca4202964d7cc
app.use(helmet());


app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());

//app.use('/api/post', postRoutes);
//app.use('/api/comment', commentRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

