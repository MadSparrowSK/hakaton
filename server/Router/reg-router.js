const {Router} = require('express')

const regRouter = new Router()

regRouter.post('/reg', (req, res) => {
    res.status(200).json({message: 'reg'})
})

module.exports = regRouter;