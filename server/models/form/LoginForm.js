const crudTempUser = require('../CRUDOperations/CRUDTempUser')
const crudActivation = require('../CRUDOperations/CRUDActivate')
const md5 = require('md5')

module.exports = class LoginForm
{
    _error = ''
    _id
    _verification
    _errorCode = ''
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
                this._error = 'Ошибка при создании записи user'
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
            if (!(activate = await crudActivation.createOneUser(paramsActivate))) {
                this._errorCode = 500
                this._error = 'Ошибка при создании записи activation'
                return false
            }

            this._verification = activate.verification

            return true
        }

        return false
    }

    /**
     * Получает статус ошибки
     * @returns {*}
     */
    getError()
    {
        return this._error
    }

    /**
     * Возвращает код верификуации
     * @returns {*}
     */
    getVerification()
    {
        return this._verification;
    }

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
    async _validate()
    {
        if (!this.email) {
            this._errorCode = 400
            this._error = 'поле email не может быть пустым'
            return false;
        }

        const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(this.email) === false) {
            this._errorCode = 400
            this._error = 'Введен не корректный email'
            return false;
        }

        if (await crudTempUser.findUser({email: {$eq: this.email}})) {
            this._errorCode = 400
            this._error = 'Данный email уже используется'
            return false;
        }

        this.password = md5(this.password)

        return true
    }
}