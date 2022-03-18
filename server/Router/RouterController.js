const DBController = require('../DatabaseAPIInterractive/DBController')

class RouterController {
    loginPostRequest(req,res) {

        res.status(200).json('ok')
    }
    async regPostRequest(req,res) {
        await DBController.createUser(req.body)
        res.status(200).json('ok')
    }
    authGetRequest(req,res) {
        res.status(200).json('ok')
    }
}

module.exports = new RouterController()