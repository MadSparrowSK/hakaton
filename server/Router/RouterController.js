const DBController = require('../DatabaseAPIInterractive/DBController')
const MailController = require('../Mail/MailController')

class RouterController {
    async loginPostRequest(req,res) {
        const verificationCode = await MailController.sendAuthCode({
            mail: 'theflash02@list.ru',
        })
        res.status(200).json({
            verificationCode
        })
    }
    async regPostRequest(req,res) {
        await DBController.createUser(req.body)
        await MailController.sendRegLink({
            mail: 'theflash02@list.ru',
            _id: '2343534534'
        });
        res.status(200).json('ok')
    }
    authGetRequest(req,res) {
        res.status(200).json('ok')
    }
}

module.exports = new RouterController()