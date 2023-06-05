const express = require('express');
const mongoose = require('mongoose');
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
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

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "647e2937b0e22670a7c73b09",
  };

  next();
});
app.use(cardRouter);
app.use(userRouter);
app.use("*", (req, res) => res.status(404).send({ message: "Страница не найдена" }));

