const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`<h1>Terjadi Kesalahan!</h1><p>${err.message}</p>`);
};

module.exports = errorHandler;
