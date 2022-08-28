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

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

app.use('/cards', require('./routes/card'));

app.use(errorLoger);
app.use(auth);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);
app.use(wayRouter);

app.use(errors());
app.use(centralError);

app.listen(PORT);
