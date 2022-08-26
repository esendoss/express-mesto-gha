const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');

const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const wayRouter = require('./routes/wrongway');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .catch((err, res) => {
    res.status(err.status);
    res.json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  });

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);
app.use(wayRouter);

app.listen(PORT);
