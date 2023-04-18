const Transfer = require('../Models/transfers.model');
const User = require('../Models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.transfer = catchAsync(async (req, res, next) => {
  const { amount, recipientAccount, senderAccount } = req.body;

  const userRecipientAccount = await User.findOne({
    where: {
      accountNumber: recipientAccount,
      status: 'active',
    },
  });

  const userSenderAccount = await User.findOne({
    where: {
      accountNumber: senderAccount,
      status: 'active',
    },
  });

  //validating user account
  if (!userRecipientAccount) return next(new AppError('User not found', 404));

  if (!userSenderAccount) return next(new AppError('User not found', 404));

  //validating the amount to be transferred is not greater than the amount of the account
  if (amount > userSenderAccount.amount)
    return next(new AppError('insufficient balance', 400));

  await userRecipientAccount.update({
    amount: userRecipientAccount.amount + amount,
  });

  await userSenderAccount.update({
    amount: userSenderAccount.amount - amount,
  });

  const transfer = await Transfer.create({
    amount: amount,
    senderUserId: userSenderAccount.id,
    receiverUserId: userSenderAccount.id,
  });

  res.status(200).json({
    status: 'success',
    message: 'Transfer has been succesfully',
    id: transfer.id,
    amount: userSenderAccount.amount,
  });
});
