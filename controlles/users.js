const User = require("../models/user");
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch(() => res.status(500).send({
        message: 'Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'
      }));
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequest('Передан некорректный Id'));
        return;
      }
      next(err);
    });
};

/*const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Введены неправильные данные. Ошибка 400.",
          err: err.message,
          stack: err.stack,
        });
      }
      return res.status(500).send({
        message: "На сервере произошла ошибка. Ошибка 500.",
        err: err.message,
        stack: err.stack,
      });
    });
};*/

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true,
      runValidators: true },
  )
    .then((user) => {
       res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      return next(err);
    });
};
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true,
      runValidators: true,
       },

  )
    .then((user) => {
       res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequest('Переданы некорректные данные'));
      } else if (err.message === 'NotFound') {
        next(new NotFound('Пользователь не найден'));
      } else next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
};