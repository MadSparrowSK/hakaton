const crudTempUser = require('../CRUDOperations/CRUDTempUser')
const crudTypeAuth= require('../CRUDOperations/CRUDTypeAuth')
const crudUserCode= require('../CRUDOperations/CRUDUserCode')
const MailController = require('../../Mail/MailController')
const crudTypeAuthUser = require('../CRUDOperations/CRUDTypeAuthUser')
const crudUser = require('../CRUDOperations/CRUDUser')
const crudActivation = require('../CRUDOperations/CRUDActivate')
const md5 = require('md5')

module.exports = class LoginForm
{
    _error = ''
    _id
    _verification
    _errorCode = ''
    _duplicateEmail = false
    email
    password
    date_create = Date.now()

    /**
     * Создание записи в базе данных при регистрации на сайте
     *
     * @param user
     * @returns {boolean}
     */
    async registerRecord(user)
    {
        const {email, password} = user
        this.email = email
        this.password = password

        if (await this._validate()) {

            const conditionUsers = {
                email: this.email,
                password: this.password,
                date_create: this.date_create,
            }

            let tempUser;
            if (! (tempUser = await crudTempUser.createOneUser(conditionUsers))){
                this._errorCode = 500
                this._error = 'Ошибка при создании записи'
                return false
            }

            this._id = tempUser._id.toString()

            const paramsActivate = {
                email: this.email,
                verification: md5(Date.now()),
                s_user_temp: tempUser._id.toString(),
                date_create: Date.now(),
                data_accept: null
            }

            let activate = null
            if (!(activate = await crudActivation.createOneActivation(paramsActivate))) {
                this._errorCode = 500
                this._error = 'Ошибка при создании записи'
                return false
            }

            this._verification = activate.verification
            this._errorCode = 'Отправлено письмо'
            return true
        }
        if (this._duplicateEmail) {
            if (! await crudActivation.deleteActivation({email: {$eq: this.email}})){
                this._errorCode = 500
                this._error = 'Ошибка при удалении записи'
                return false
            }

            const tempUser = await crudTempUser.findUser({email: {$eq: this.email}});
            if (tempUser){
                this._id = tempUser._id.toString()
                const paramsActivate = {
                    email: this.email,
                    verification: md5(Date.now()),
                    s_user_temp: tempUser._id.toString(),
                    date_create: Date.now(),
                    data_accept: null
                }

                let activate = null
                if (!(activate = await crudActivation.createOneActivation(paramsActivate))) {
                    this._errorCode = 500
                    this._error = 'Ошибка при создании записи'
                    return false
                }

                this._verification = activate.verification

                return true
            }
        }

        return false
    }

    async loginRecord(params)
    {
        const {email, password} = params
        this.email = email
        this.password = password
        if (await this._validate(true)){
            const user = await crudUser.findUser({email: {$eq: email}, password: {$eq: this.password}})
            if (user) {
                if (user.dual_auth){
                    const authTypeUser = await crudTypeAuthUser.findOne({s_user: {$eq: user._id.toString()}})
                    if (!authTypeUser) {
                        this._errorCode = '500'
                        return false
                    }
                    const authType = await crudTypeAuth.findOne({_id: {$eq: authTypeUser.s_type}})
                    if (!authType) {
                        this._errorCode = '500'
                        return false
                    }
                    switch (authType.code){
                        case 'email':
                            await this._sendMail({email: user.email, user: user})
                            this._error = 'На почту выслан код подтверждения'
                            this._errorCode = '200'
                            return {type: 'email'};
                        case 'dynamic':
                            this._errorCode = '200'
                            return {type: 'dynamic'};
                        default:
                            this._error = 'Ошибка при поиске двухфакторной аутентификации'
                            this._errorCode = '404'
                            return false
                    }
                } else {
                    this._errorCode = '201'
                    this._error = 'Вы успешно авторизовались'
                    return {type: null}
                }
            }
            this._error = 'Неверно введен логин или пароль'
        }

        this._errorCode = '404'
        return false

    }

    async checkCode(params)
    {
        const { email, code } = params
        const user = await crudUser.findUser({email: {$eq: email}})
        if (user) {
            const userCode = await crudUserCode.findOne({s_user: user._id.toString()})
            if (userCode.code === code) {
                await crudUserCode.delete({s_user: {$eq: user._id.toString()}, dynamic: false})
                this._error = 'Успешно введен код';
                this._errorCode = '200'
                return true;
            }
            this._error = 'не верно введен код';
            this._errorCode = '404'
            return false
        }

        this._error = 'Ошибка аккаунт не найден';
        this._errorCode = '404'
        return false
    }

    /**
     * Получает статус ошибки
     * @returns {*}
     */
    getResponse()
    {
        return this._error
    }

    /**
     * возвращает код ошибки
     *
     * @returns {string}
     */
    getResponseCode()
    {
        return this._errorCode
    }

    /**
     * Возвращает код верификуации
     * @returns {*}
     */
    getVerification()
    {
        return this._verification;
    }

    /**
     * возвращает код созданной модели временного пользователя
     * @returns {*}
     */
    getId()
    {
        return this._id
    }

    /**
     * Валидация данных приходящих на форму
     *
     * @returns {boolean}
     * @private
     */
    async _validate(login=false)
    {
        if (!this.email) {
            this._errorCode = 400
            this._error = 'поле email не может быть пустым'
            return false;
        }

        if (!this.password) {
            this._errorCode = 400
            this._error = 'поле password не может быть пустым'
            return false;
        }

        const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(this.email) === false) {
            this._errorCode = 400
            this._error = 'Введен не корректный email'
            return false;
        }

        if (!login) {
            const user = await crudUser.findUser({email: {$eq: this.email}})
            if (user) {
                this._errorCode = 403
                this._error = 'Данный аккаунт уже зарегистрирован'
                return false;
            }

            if (await crudTempUser.findUser({email: {$eq: this.email}})) {
                this._errorCode = 400
                this._error = 'На данный email было выслано повторно письмо'
                this._duplicateEmail = true
                return false;
            }
        }

        this.password = md5(this.password)

        return true
    }

    async _sendMail(email)
    {
        const code = await MailController.sendAuthCode({email: email.email})
        await crudUserCode.createOne({s_user: email.user._id.toString(), code: code})
    }
}