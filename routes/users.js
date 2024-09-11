const userRoutes = require("express").Router();
const { createUser, login, getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

userRoutes.post("/signUp", createUser);
userRoutes.post("/signin", login);

userRoutes.get("/users/me", auth, getCurrentUser);
userRoutes.patch("/users/me", auth, updateUser);

module.exports = userRoutes;
