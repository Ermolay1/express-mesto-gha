const Card = require("../models/card");
const NotFound = require('../errors/NotFound');
const CurrentError = require('../errors/CurrentError');
const BadRequest = require('../errors/BadRequest');

const getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card
    .create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequest('Введены неправильные данные. Ошибка 400.'));
      } else {
        next(err);
      }
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
   .orFail(() => {
    throw new NotFound('Карточка с таким _id не найдена');
   })
   .then((card) => {
      const owner = card.owner.toString();
      if (req.user._id === owner) {
       Card.deleteOne(card)
        .then(() => {
          res.send(card);
        })
        .catch(next);
      } else {
        throw new CurrentError('Невозможно удалить карточку');
      }
    })
    .catch((e) => {
       if (e.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные удаления'));
       } else {
        next(e);
       }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Пользователь не найден');
      }
       res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequest('Переданы некорректные данные для лайка'));
      }
      return next(err);
    });
};
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Пользователь не найден');
      }
      res.send({ data: card});
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequest('Переданы некорректные данные для лайка'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};