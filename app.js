const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("./utils/ratelimiter");
const router = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
  })
  .catch(console.error);

app.use(express.json());

app.use(helmet());
app.use(rateLimiter);
app.use(cors());

app.use("/", router);

app.listen(PORT, () => {
});
