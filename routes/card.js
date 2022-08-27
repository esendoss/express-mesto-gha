const cardRouter = require('express').Router();
const {
  validateUserCard,
  validateCard,
} = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', validateCard, createCard);
cardRouter.delete('/cards/:cardId', validateUserCard, deleteCard);
cardRouter.put('/cards/:cardId/likes', validateUserCard, likeCard);
cardRouter.delete('/cards/:cardId/likes', validateUserCard, dislikeCard);

module.exports = cardRouter;
