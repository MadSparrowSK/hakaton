const {Router} = require('express')
const RouterController = require('./RouterController')

const regRouter = new Router()

regRouter.post('/reg', RouterController.regPostRequest)

module.exports = regRouter;