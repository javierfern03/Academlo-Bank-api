const express = require('express');

//CONTROLLLERS
const transferController = require('../Controllers/transfer.controller');

//MIDDLEWARES
const authMiddleware = require('../Middlewares/auth.middlewares');

const router = express.Router();

router.post('/', authMiddleware.protect, transferController.transfer);

module.exports = router;
