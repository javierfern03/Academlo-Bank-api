const User = require('../Models/users.model');
const bcrypt = require('bcryptjs');
const generateJwt = require('../utils/jwt');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  const generateAccountNumber = Math.round(Math.random() * 999999);

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password.trim(), salt);

  const user = await User.create({
    name: name.toLowerCase().trim(),
    password: encryptedPassword,
    accountNumber: generateAccountNumber,
  });

  const token = await generateJwt(user.id);

  res.status(200).json({
    status: 'success',
    message: 'User has been create successfully',
    token,
    user: {
      id: user.id,
      accountNumber: user.accountNumber,
      name: user.name,
      amount: user.amount,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber: accountNumber,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('incorret', 401));
  }

  const token = await generateJwt(user.id);

  res.status(200).json({
    status: 'success',
    message: 'User logged',
    token,
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
  });
});
