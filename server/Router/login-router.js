const {Router} = require('express')
const RouterController = require('./RouterController')

const loginRouter = new Router();

loginRouter.post('/login', RouterController.loginPostRequest)

loginRouter.post('/login/verify', RouterController.loginVerifyCode)

module.exports = loginRouter;