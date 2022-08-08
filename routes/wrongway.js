const wayRouter = require('express').Router();

wayRouter.use((req, res) => {
  res.status(404).send({ message: 'Путь не найден' });
});

module.exports = wayRouter;
