const express = require('express');

//CONTROLLER
const usersControllers = require('../Controllers/users.controller');

//MIDDLEWARES

const router = express.Router();

router.post('/signup', usersControllers.signup);

router.post('/login', usersControllers.login);

module.exports = router;
