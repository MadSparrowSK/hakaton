const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.testEmailAccount = nodemailer.createTestAccount();
        this.transporter = new nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kapitnov00@gmail.com',
                pass: 'justicesk0026'
            }
        })
    }

    async sendLink(mail, link) {
        await this.transporter.sendMail({
            from: "kapitnov00@gmail.com",
            to: mail,
            subject: 'DDoS-Guard, verify your account to get access to our products',
            html: '<a href="' + link + '">verification link</a>'
        })
    }

    async sendCode(mail, code) {
        await this.transporter.sendMail({
            from: "kapitnov00@gmail.com",
            to: mail,
            subject: 'DDoS-Guard, verifying code',
            text: code
        })
        return true;
    }
}

module.exports = new MailService();