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
            subject: 'Test Send Mail in Node.js',
            html: '<a href="' + link + '">Link</a>'
        })
    }

    async sendCode(mail, code) {
        await this.transporter.sendMail({
            from: "kapitnov00@gmail.com",
            to: mail,
            subject: 'Test Send Mail in Node.js',
            text: code
        })
    }
}

module.exports = new MailService();