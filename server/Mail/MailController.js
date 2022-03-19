const MailService = require('./MailService')

MailService.sendLink = MailService.sendLink.bind(MailService);
MailService.sendCode = MailService.sendCode.bind(MailService);

class MailController {
    async sendRegLink(user) {
        const { mail, _id } = user;
        const link = `http://localhost:5000/auth/${_id}`;
        await MailService.sendLink(mail, link);
    }
    async sendAuthCode(user) {
        const { mail } = user;
        const code = Math.floor(Math.random() * 1000);
        await MailService.sendCode(mail, code.toString())
        return code
    }
}

module.exports = new MailController();