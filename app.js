const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const { centralError } = require('./middlewares/centralError');

const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { validateLogin, validateRegister } = require('./middlewares/validation');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const wayRouter = require('./routes/wrongway');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);

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

app.use(auth);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);
app.use(wayRouter);

app.use(errors());
app.use(centralError);

app.listen(PORT);
