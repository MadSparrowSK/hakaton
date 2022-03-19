const MailService = require('./MailService')
const randomstring = require("randomstring");

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
        const code = randomstring.generate(7);
        await MailService.sendCode(email, code)
        return code
    }
}

module.exports = new MailController();