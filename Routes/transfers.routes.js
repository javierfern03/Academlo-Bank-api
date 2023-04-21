const express = require('express');

//CONTROLLLERS
const transferController = require('../Controllers/transfer.controller');

//MIDDLEWARES
const authMiddleware = require('../Middlewares/auth.middlewares');
const validationMiddleware = require('../Middlewares/validations.middlewares');

const router = express.Router();

router.post(
  '/',
  authMiddleware.protect,
  validationMiddleware.sendTransfer,
  transferController.transfer
);

module.exports = router;
