const express = require('express');

//CONTROLLER
const usersControllers = require('../Controllers/users.controller');

//MIDDLEWARES
const validationUser = require('../Middlewares/validations.middlewares');

const router = express.Router();

router.post(
  '/signup',
  validationUser.createUserValidation,
  usersControllers.signup
);

router.post('/login', usersControllers.login);

module.exports = router;
