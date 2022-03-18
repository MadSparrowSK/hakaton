const {Router} = require('express')

const authRouter = new Router()

authRouter.get('/auth/:id', (req,res) => {
    res.status(200).json({message: 'auth'})
})

module.exports = authRouter;