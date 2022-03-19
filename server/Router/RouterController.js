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
            res.status(LogForm.getErrorCode()).json({
                message: LogForm.getError()
            })
        } else {
            const {email} = req.body;
            const hash = LogForm.getVerification()
            await MailController.sendRegLink({
                email,
                _id: LogForm.getId(),
                hash
            });
            res.status(200).json({
                message: LogForm.getError()
            })
        }
    }
    authGetRequest(req,res) {
        const {id, hash} = req.query;
        res.status(200).json({
            message: 'user verified'
        })
        res.status(302).redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    }
}

module.exports = new RouterController()