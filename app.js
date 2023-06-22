const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUserValid, loginValid } = require('./middlewares/validation');
const NotFound = require('./errors/NotFound');
const errorHandler = require('./middlewares/errorHandler');
const { PORT = 3000 } = process.env;
const { bd = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
const { createUser, login } = require('./controlles/login');

app.post('/signin', loginValid, login);
app.post('/signup', createUserValid, createUser);

app.use(usersRouter);
app.use(cardsRouter);
app.use((req, res, next) => {
  next(new NotFound('Страница по этому адресу не найдена'));
});
app.use(errors());
app.use(errorHandler);

mongoose.connect(bd)
.then(() => {
  console.log('Подключение к базе состоялось')

  app.listen(PORT, () => {
    console.log(`Приложение работает на порте ${PORT}`)
  })
})

.catch((err) => {
  console.log('Ошибка подключения к базе', err)

  process.exit();
});