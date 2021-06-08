const express = require('express');

const helmet = require('helmet');

const bodyParser = require('body-parser');

const rateLimit = require("express-rate-limit");

const path = require('path');

const limiter = rateLimit({
  windowsMs: 15*60*1000,
  max: 100
});

const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

const app = express();

app.use(limiter);

require('dotenv').config();

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());

app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
