const userRoutes = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/:userid', getUserById);
userRoutes.post('/', createUser);

module.exports = userRoutes;