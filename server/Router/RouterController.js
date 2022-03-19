const LoginForm = require('../models/form/LoginForm')
const MailController = require('../Mail/MailController')
const OperationWithModels = require('../models/OperationWithModels')

const LogForm = new LoginForm();

class RouterController {
    async loginPostRequest(req,res) {
        const { email, password } = req.body;
        const isLogIn = await LogForm.loginRecord({ email, password });
        if(!isLogIn) {
            res.status(LogForm.getErrorCode())
                .json({ message:LogForm.getError() });
        } else {
            res.status(LogForm.getErrorCode()).json({
                message: LogForm.getError()
            })
        }
    }
    async loginVerifyCode(req, res) {
        const { email, verification_code } = req.body;
        const obj = {};
        res.status(200).json({
            message: 'loginVerifyCode'
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
    async authGetRequest(req,res) {
        const {id, hash} = req.query;
        const isConfirm = await OperationWithModels.confirmAccount({id, hash});
        if(!isConfirm) {
            res.status(OperationWithModels.getResponseCode()).json({
                message: OperationWithModels.getResponse()
            })
        } else {
            res.status(302).redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        }
    }
}

module.exports = new RouterController()