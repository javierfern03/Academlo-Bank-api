const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.sendTransfer = [
  body('recipientAccount')
    .notEmpty()
    .withMessage('The account number cannot be ampty')
    .isLength({ min: 6 })
    .withMessage('The account number must be at least 6 characters long'),
  body('senderAccount')
    .notEmpty()
    .withMessage('The account number cannot be ampty')
    .isLength({ min: 6 })
    .withMessage('The account number must be at least 6 characters long'),
  body('amount').notEmpty().withMessage('The amount cannot be ampty'),
  validFields,
];
