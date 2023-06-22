const router = require('express').Router();
const {
  deleteCard,
  dislikeCard,
  createCards,
  getCards,
  likeCard,
} = require('../controlles/cards');
const {
  createCardsValid,
  cardIdValid,
} = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', createCardsValid, createCards);
router.delete('/cards/:cardId', cardIdValid, deleteCard);
router.put('/cards/:cardId/likes', cardIdValid, likeCard);
router.delete('/cards/:cardId/likes', cardIdValid, dislikeCard);

module.exports = router;