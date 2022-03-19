const {Router} = require('express')
const RouterController = require('./RouterController')

const manyFactorAuthRouter = new Router()

manyFactorAuthRouter.get('/many-factor-check', RouterController.manyFactorCheck);
manyFactorAuthRouter.post('/many-factor-activate', RouterController.manyFactorActivate);

module.exports = manyFactorAuthRouter;