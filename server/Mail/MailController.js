const MailService = require('./MailService')

MailService.sendLink = MailService.sendLink.bind(MailService);
MailService.sendCode = MailService.sendCode.bind(MailService);

class MailController {
    async sendRegLink(user) {
        const { email, _id, hash } = user;
        const link = `http://localhost:5000/auth?id=${_id}&hash=${hash}`;
        await MailService.sendLink(email, link);
    }
    async sendAuthCode(user) {
        const { email } = user;
        const code = Math.floor(Math.random() * 1000);
        await MailService.sendCode(email, code.toString())
        return code
    }
}

module.exports = new MailController();