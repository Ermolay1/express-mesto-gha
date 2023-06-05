const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Ошибка сервера. Ошибка 500.",
        err: err.message,
        stack: err.stack,
      });
    });
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
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
        message: "Ошибка сервера. Ошибка 500.",
        err: err.message,
        stack: err.stack,
      });
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: "Пользователь не найден. Ошибка 404.",
        });
      }
      return res.send(card);
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
        message: "Ошибка сервера. Ошибка 500.",
        err: err.message,
        stack: err.stack,
      });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({
          message: "Пользователь не найден. Ошибка 404.",
        });
      }
      return res.send(card);
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
        message: "Ошибка сервера. Ошибка 500.",
        err: err.message,
        stack: err.stack,
      });
    });
};
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({
           message: "Пользователь не найден. Ошибка 404." });
      }
      return res.send(card);
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
        message: "Ошибка сервера. Ошибка 500.",
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};