const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const path = require('path');
require('dotenv').config();

const limiter = rateLimit({
  windowsMs: 15*60*1000,
  max: 100
});
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



app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());

//app.use('/api/post', postRoutes);
//app.use('/api/comment', commentRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
