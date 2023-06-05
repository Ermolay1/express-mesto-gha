const express = require('express');
const mongoose = require('mongoose');

const { getUser, createUser } = require('./controlles/user');
const router = express.Router();
const app = express();


router.get((req, res) => {
  res.status(200).send('gjhjk')
});
router.get('/user', getUser);
router.post('/user', createUser);

app.use(router);


mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
.then(() => {
  console.log('Подключение к базе состоялось')

  app.listen(3000, () => {
    console.log(`Приложение работает на порте 3000`)
  })
})

.catch((err) => {
  console.log('Ошибка подключения к базе', err)

  process.exit();
})