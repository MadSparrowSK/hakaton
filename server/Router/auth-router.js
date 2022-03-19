const {Router} = require('express')
const RouterController = require('./RouterController')

const authRouter = new Router()

authRouter.get('/auth', RouterController.authGetRequest)

module.exports = authRouter;