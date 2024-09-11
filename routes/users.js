const userRoutes = require('express').Router();
const { createUser, login } = require('../controllers/users');

userRoutes.post('/signUp', createUser);
userRoutes.post('/signin', login);

module.exports = userRoutes;