'use strict';
const AuthRouter = require('express').Router();
const AuthController = require('../controller/auth.controller');


// Login route
AuthRouter.post('/login', AuthController.loginUser);
AuthRouter.post('/register', AuthController.registerUser);

module.exports = AuthRouter;
