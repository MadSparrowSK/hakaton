const {Router} = require('express')

const errorRouter = new Router()

errorRouter.get('*', (req,res) => {
    res.status(404).json({message: 'Error 404 not found'})
})
errorRouter.post('*', (req,res) => {
    res.status(403).json({message:'Error 403, access denied'})
})
errorRouter.put('*', (req,res) => {
    res.status(403).json({message:'Error 403, access denied'})
})
errorRouter.delete('*', (req,res) => {
    res.status(403).json({message:'Error 403, access denied'})
})

module.exports = errorRouter;