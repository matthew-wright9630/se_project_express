const userRoutes = require("express").Router();
const { createUser, login, getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

userRoutes.post("/signUp", createUser);
userRoutes.post("/signin", login);
userRoutes.use(auth);
userRoutes.get("/users/me", getCurrentUser);
userRoutes.patch("/users/me", updateUser);

module.exports = userRoutes;
