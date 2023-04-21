const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../Models/users.model');
const { promisify } = require('util');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('Ypu are not logged in!, Please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'active',
    },
  });

  if (!user) {
    return next(
      new AppError('The owner if this token it not longer available', 401)
    );
  }

  req.sessionUser = user;
  next();
});

// exports.userOwnerAccount = catchAsync(async (req, res, next) => {
//   const { sessionUser } = req;

//   if (sessionUser.id !== user.id) {
//     return next(new AppError('you are not the account owner', 401));
//   }
//   next();
// });
