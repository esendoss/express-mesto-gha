const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

//  загрузка всех пользователей из бд
module.exports.getUsers = (req, res) => {
  User.find()
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

//  загрузка пользователя по id
module.exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден.');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.errMessage });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.status(200).send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные при создании пользователя' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

//  обновляет профиль
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate({ name, about }, req.user._id, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден.');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.errMessage });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректный id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

//  обновляет аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate({ avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден.');
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.errMessage });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректный id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
