const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
  .then((user) => res.status(200).send({data: user}))
  .catch((err) => {
    console.log(err);
    res.status(508).send({message: 'Ошибка'});
  });
}

module.exports.createUser = (req,res) => {
  User.create({ name: 'test', about: 'test', avatar: '1'})
  .then((user) => {
    res.status(200).send({ data: user});
  })
  .catch((err) => {
    console.log(err);
    res.status(508).send({ massang: 'Ошибка'});
  });
}


