const router = require('express').Router();
const {
  deleteCardById,
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
router.delete('/cards/:cardId', cardIdValid, likeCard);
router.put('/cards/:cardId/likes', cardIdValid, likeCard);
router.delete('/cards/:cardId/likes', cardIdValid, dislikeCard);

module.exports = router;