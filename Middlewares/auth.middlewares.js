const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { token } = require('morgan');
const AppError = require('../utils/appError');
const User = require('../Models/users.model');

exports.protect = catchAsync(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new appError('Ypu are not logged in!, Please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = User.findOne({
    where: {
      id: decode.id,
      status: 'active',
    },
  });

  req.sessionUser = user;
  next();
});
