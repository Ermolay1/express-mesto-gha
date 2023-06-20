const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard
} = require('../controlles/cards');
const {
  createCardsValid,
  cardIdValid
} = require('../middlewares/validation');

router.get("/cards", getCards);
router.post("/cards", createCardsValid, createCard);
router.delete("/cards/:cardId", cardIdValid, deleteCardById);
router.put("/cards/:cardId/likes", cardIdValid, likeCard);
router.delete("/cards/:cardId/likes", cardIdValid, dislikeCard);

module.exports = router;
/*{
  "_id": {
    "$oid": "647e2937b0e22670a7c73b09"
  }
}*/