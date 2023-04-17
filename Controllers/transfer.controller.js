const User = require('../Models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.transfer = catchAsync(async (req, res, next) => {
  const { amount, recipientAccount, senderAccount } = req.body;
  const { sessionUser } = req;

  const user = await User.findOne({
    where: {
      accountNumber: senderAccount,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  if (amount < sessionUser.amount) {
    return next(new AppError('insufficient balance', 400));
  }
});
