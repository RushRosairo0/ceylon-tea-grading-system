const errorHandler = (error, req, res, next) => {
  const { statusCode, message, errors = [] } = error;
  const httpCode = statusCode || 500;

  const responseData = {
    message: message,
  };

  // check for additional errors
  if (errors.length !== 0) {
    responseData.errors = errors;
  }

  res.status(httpCode).json({
    success: false,
    response: {
      status: httpCode,
      data: responseData,
    },
  });
};

module.exports = errorHandler;
