const LoginForm = require('../models/form/LoginForm')
const MailController = require('../Mail/MailController')

const LogForm = new LoginForm();

class RouterController {
    async loginPostRequest(req,res) {
        const verificationCode = await MailController.sendAuthCode(req.body)
        res.status(200).json({
            verificationCode
        })
    }
    async regPostRequest(req,res) {
        const userCheck = await LogForm.registerRecord(req.body);
        if(!userCheck) {
            res.status(500).json({
                message: LogForm.getError()
            })
        }


        const { mail } = req.body;
        const hash = LogForm.getVerification()
        await MailController.sendRegLink({
            mail,
            _id: '2343534534',
            hash
        });
        res.status(200).json({
            message: 'registration success'
        })
    }
    authGetRequest(req,res) {
        res.status(200).json('ok')
    }
}

module.exports = new RouterController()