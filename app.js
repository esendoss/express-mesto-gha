const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { centralError } = require('./middlewares/centralError');
const { validateLogin, validateRegister } = require('./middlewares/validation');
const { requestLogger, errorLoger } = require('./middlewares/logger');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const wayRouter = require('./routes/wrongway');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', validateRegister, createUser);
app.post('/signin', validateLogin, login);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);
app.use(wayRouter);

app.use(errorLoger);

app.use(errors());
app.use(centralError);

app.listen(PORT);
