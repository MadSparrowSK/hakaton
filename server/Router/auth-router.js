const {Router} = require('express')
const RouterController = require('./RouterController')

const authRouter = new Router()

authRouter.get('/auth/:id', RouterController.authGetRequest)

module.exports = authRouter;