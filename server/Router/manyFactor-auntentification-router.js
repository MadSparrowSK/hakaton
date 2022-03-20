const {Router} = require('express')
const RouterController = require('./RouterController')

const manyFactorAuthRouter = new Router()

manyFactorAuthRouter.post('/many-factor-check', RouterController.manyFactorCheck);
manyFactorAuthRouter.post('/many-factor-activate', RouterController.manyFactorActivate);

module.exports = manyFactorAuthRouter;