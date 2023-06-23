const router = require('express').Router();
const express = require('express');
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controlles/users');

const {
  updateAvatarValid,
  getUsersByIdValid,
  updateUserValid,
} = require('../middlewares/validation');

router.use(auth);

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.patch('/users/me/avatar', updateAvatarValid, updateAvatar);

router.patch('/users/me', updateUserValid, updateProfile);

router.get('/users/:userId', getUsersByIdValid, getUserById);

router.use(express.json());

module.exports = router;
