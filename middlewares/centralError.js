module.exports.centralError = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).send({ err });

  next();
};
