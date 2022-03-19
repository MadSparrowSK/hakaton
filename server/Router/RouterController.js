const LoginForm = require('../models/form/LoginForm')
const MailController = require('../Mail/MailController')
const OperationWithModels = require('../models/OperationWithModels')

const LogForm = new LoginForm();

class RouterController {
    async loginPostRequest(req,res) {
        const { email, password } = req.body;
        const isLogIn = await LogForm.loginRecord({ email, password });
        if(!isLogIn) {
            res.status(LogForm.getResponseCode())
                .json({ message:LogForm.getResponse() });
        } else {
            res.status(LogForm.getResponseCode()).json({
                message: LogForm.getResponse()
            })
        }
    }
    async loginVerifyCode(req, res) {
        const { email, code } = req.body;
        const isVerify = await LogForm.checkCode({ code, email });
        if(isVerify) {
            res.status(LogForm.getResponseCode()).redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        } else {
            res.status(LogForm.getResponseCode()).json({
                message: LogForm.getResponse()
            })
        }

    }
    async manyFactorCheck(req,res) {
        const { email } = req.query;
        const typeManyFactor = await OperationWithModels.modalAuth({ email });
        res.status(OperationWithModels.getResponseCode()).json({
            message: OperationWithModels.getResponse(),
            data: typeManyFactor
        })
    }
    async manyFactorActivate(req,res) {
        const { email, code, status } = req.body;
        const isSuccess = await OperationWithModels.dualAuth({ email, code, status });
        res.status(OperationWithModels.getResponseCode()).json({
            message: OperationWithModels.getResponse()
        })
    }
    async regPostRequest(req,res) {
        const userCheck = await LogForm.registerRecord(req.body);
        if(!userCheck) {
            res.status(LogForm.getResponseCode()).json({
                message: LogForm.getResponse()
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
                message: LogForm.getResponse()
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