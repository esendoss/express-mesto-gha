const userRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUser,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../controllers/user');

userRouter.get('/users', auth, getUsers);
userRouter.get('/users/me', auth, getUser);
userRouter.get('/users/:userId', auth, getUserId);
userRouter.patch('/users/me', auth, updateUser);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
