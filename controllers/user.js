const User = require('../models/user');

const ERROR_CODE_400 = 400;
const ERROR_CODE_500 = 500;
const ERROR_CODE_404 = 404;

//  загрузка всех пользователей из бд
module.exports.getUsers = (req, res) => {
  User.find()
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' }));
};

//  загрузка пользователя по id
module.exports.getUser = (req, res) => {
  const id = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден.' });
        return;
      }
      res.send({ data: user });
    })
    .catch(() => res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' }));
};

// создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: 'Некорректные данные при создании пользователя' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
    });
};

//  обновляет профиль
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate({ name, about }, req.user._id, { new: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден.' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: 'Некорректные данные при обновлении профиля' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
    });
};

//  обновляет аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate({ avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден.' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: 'Некорректные данные при обновлении аватара.' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Произошла ошибка' });
    });
};
