const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: "На сервере произошла ошибка. Ошибка 500.",
        err: err.message,
        stack: err.stack,
      });
    });
};
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((users) => {
      if (!users) {
        return res.status(404).send({
          message: "Пользователь не найден. Ошибка 404.",
        });
      }
      return res.send(users);
    })
    .catch((err) => {
      if (err.name === "CastError") {
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
};
const createUser = (req, res) => {
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
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Пользователь не найден. Ошибка 404.",
      });
    }
      return res.send(user);
    })
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
};
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true },

  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Пользователь не найден. Ошибка 404.",
        });
      }
      return res.send(user);
    })
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
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};