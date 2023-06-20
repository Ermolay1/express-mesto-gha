const express = require('express');
const mongoose = require('mongoose');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { createUserValid, loginValid} = require('./middlewares/validation');
const NotFound = require('./errors/NotFound');
const { createUser, login } = require('./controlles/login');

const app = express();
const { PORT = 3000 } = process.env;
const { bd = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use((_, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(express.json());
app.use(bodyParser.json());


app.post('/signin', loginValid, login);
app.post('/signup', createUserValid, createUser);

app.use(cardRouter);
app.use(userRouter);
app.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

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
})