module.exports = app.use((err, req, res, next) => {
  console.error(err);
  return res
    .status(500)
    .send({ message: "An error has occurred on the server" });
});
