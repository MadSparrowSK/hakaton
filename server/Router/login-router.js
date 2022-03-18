const {Router} = require('express')

const loginRouter = new Router();

loginRouter.post('/login', (req,res) => {
    res.status(200).json({message:'test' });
})


module.exports = loginRouter;