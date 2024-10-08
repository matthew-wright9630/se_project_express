const userRoutes = require("express").Router();
const { createUser, login, getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUserSignUp, validateUserSignIn, validateUpdateUser } = require("../middlewares/validation");

userRoutes.post("/signUp", validateUserSignUp, createUser);
userRoutes.post("/signin", validateUserSignIn, login);

userRoutes.get("/users/me", auth, getCurrentUser);
userRoutes.patch("/users/me", auth, validateUpdateUser, updateUser);

module.exports = userRoutes;
