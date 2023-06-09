const AppError = require('../utils/appError');

const handleCastError22P02 = () =>
  new AppError('Some type of data send does not match was expected', 400);

const handleJWTExpiredError = () =>
  new AppError('You token has expired! Please login again.', 401);

const handleJWTErrror = () =>
  new AppError('Invalid Token. Please login again!', 401);

const handleUniqueKey = () =>
  new AppError(
    'llave duplicada viola restricción de unicidad «users_email_key»',
    400
  );

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //Programming or other unknown err: dont leak error details
    console.error('error', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV == 'production') {
    let error = err;

    if (err.parent?.code === '22P02') error = handleCastError22P02();
    if (error.name == 'TokenExpiredError') error = handleJWTExpiredError();
    if (error.name == 'JsonWebTokenError') error = handleJWTErrror();
    if (err.parent?.code == 'SequelizeUniqueConstraintError')
      error = handleUniqueKey();

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
