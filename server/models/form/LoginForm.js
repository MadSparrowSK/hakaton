const crudTempUser = require('../CRUDOperations/CRUDTempUser')
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

            return true
        }
        if (this._duplicateEmail) {
            if (! await crudActivation.deleteActivation({email: {$eq: this.email}})){
                this._errorCode = 500
                this._error = 'Ошибка при удалении записи'
                return false
            }

            const tempUser = await crudTempUser.findUser({email: {$eq: this.email}});
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
     * возвращает код ошибки
     *
     * @returns {string}
     */
    getErrorCode()
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
            this._error = 'На данный email было выслано повторно письмо'
            this._duplicateEmail = true
            return false;
        }

        this.password = md5(this.password)

        return true
    }
}