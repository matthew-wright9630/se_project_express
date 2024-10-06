const userRoutes = require("express").Router();
const { createUser, login, getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUserSignUp, validateUserSignIn, validateGetUserRequest } = require("../middlewares/validation");

userRoutes.post("/signUp", validateUserSignUp, createUser);
userRoutes.post("/signin", validateUserSignIn, login);

userRoutes.get("/users/me", auth, validateGetUserRequest, getCurrentUser);
userRoutes.patch("/users/me", auth, validateGetUserRequest, updateUser);

module.exports = userRoutes;
