const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ErrorCode = require('../errorCode/errorCode');

//  возвращает все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(ErrorCode.ERROR_CODE_500).send({ message: 'Произошла ошибка' }));
};

// создаёт карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.status(ErrorCode.ERROR_CODE_200).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ErrorCode.ERROR_CODE_400).send({ message: 'Некорректные данные при создании карточки' });
      }
      return res.status(ErrorCode.ERROR_CODE_500).send({ message: 'Произошла ошибка' });
    });
};

//  удаляет карточку по идентификатору
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => res.status(ErrorCode.ERROR_CODE_200).send({ data: card }))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(ErrorCode.ERROR_CODE_404).send({ message: err.errMessage });
      }
      if (err.name === 'CastError') {
        return res.status(ErrorCode.ERROR_CODE_400).send({ message: 'Некорректные данные' });
      }
      return res.status(ErrorCode.ERROR_CODE_500).send({ message: 'Произошла ошибка' });
    });
};

//  поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => res.status(ErrorCode.ERROR_CODE_200).send({ data: card }))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(ErrorCode.ERROR_CODE_404).send({ message: err.errMessage });
      }
      if (err.name === 'CastError') {
        return res.status(ErrorCode.ERROR_CODE_400).send({ message: 'Некорректные данные' });
      }
      return res.status(ErrorCode.ERROR_CODE_500).send({ message: 'Произошла ошибка' });
    });
};

// убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => res.status(ErrorCode.ERROR_CODE_200).send({ data: card }))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(ErrorCode.ERROR_CODE_404).send({ message: err.errMessage });
      }
      if (err.name === 'CastError') {
        return res.status(ErrorCode.ERROR_CODE_400).send({ message: 'Некорректные данные' });
      }
      return res.status(ErrorCode.ERROR_CODE_500).send({ message: 'Произошла ошибка' });
    });
};
