class RouterController {
    loginPostRequest(req,res) {
        res.status(200).json('ok')
    }
    regPostRequest(req,res) {
        res.status(200).json('ok')
    }
    authGetRequest(req,res) {
        res.status(200).json('ok')
    }
}

module.exports = new RouterController()