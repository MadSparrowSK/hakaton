const crudActivation = require('./CRUDOperations/CRUDActivate')
const crudUser = require('./CRUDOperations/CRUDUser')
const crudTempUser = require('./CRUDOperations/CRUDTempUser')

module.exports = class OperationWithModels
{
    static _error=''
    static _codeError=''

    static async confirmAccount(params)
    {
        const {id, hash} = params
        let activation = await crudActivation.findActivation({s_user_temp: id, verification: hash})
        if (activation) {

            const date1 = activation.data_create;
            const date2 = Date.now();
            const days = Math.abs(date2.getTime() - date1) / (1000 * 3600 * 24);
            if (days>=1) {
                this._error = 'Данная ссылка устарела'
                this._codeError = '404'
                return false
            }
            let tempUser = await crudTempUser.findUserById(activation._id.toString())
            if (await crudActivation.deleteActivation({s_user_temp: {$eq: id}})) {
                const user = await crudUser.createOneUser({
                    email: tempUser.email,
                    password: tempUser.password,
                    email_confirm: true
                })
                this._error = 'Почта успешно подтверждена'
                this._codeError = '200'
                return true
            }
        }

        this._error = 'Ошибка при активации аккаунта'
        this._codeError = '500'
        return false
    }

    /**
     * Возвращает текст ответа
     *
     * @returns {string}
     */
    static getResponse()
    {
        return this._error
    }

    /**
     * Возвращает код ошибки
     *
     * @returns {string}
     */
    static getResponseCode()
    {
        return this._codeError
    }
}