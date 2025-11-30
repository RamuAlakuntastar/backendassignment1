const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err.stack);

  res.status(err.statusCode || 500).json({
    status: "failure",
    message: err.message || "Something went wrong"
  });
};

module.exports = errorHandler;
