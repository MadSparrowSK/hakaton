const crudActivation = require('./CRUDOperations/CRUDActivate')
const crudUser = require('./CRUDOperations/CRUDUser')
const crudTypeAuth = require('./CRUDOperations/CRUDTypeAuth')
const crudTypeAuthUser = require('./CRUDOperations/CRUDTypeAuthUser')
const crudTempUser = require('./CRUDOperations/CRUDTempUser')

module.exports = class OperationWithModels
{
    static _error=''
    static _codeError=''

    /**
     * 
     * @param params
     * @returns {Promise<boolean>}
     */
    static async confirmAccount(params)
    {
        const {id, hash} = params
        let activation = await crudActivation.findActivation({s_user_temp: id, verification: hash})
        if (activation) {

            const date1 = new Date(activation.data_create).getTime();
            const date2 = Date.now()
            const days = Math.abs(date2 - date1) / (1000 * 3600 * 24);
            if (days>=1) {
                this._error = 'Данная ссылка устарела'
                this._codeError = '404'
                return false
            }
            let tempUser = await crudTempUser.findUserById(activation.s_user_temp)
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
        } else {
            const tempUser = await crudTempUser.findUserById(id)
            const user = await crudUser.findUser({email: {$eq: tempUser.email}})
            if (user) {
                if (user.email_confirm) {
                    this._error = 'Аккаунт уже активирован'
                    this._codeError = '403'
                    return false
                }
            }
        }

        this._error = 'Ошибка при активации аккаунта'
        this._codeError = '500'
        return false
    }

    /**
     *
     * @param params
     * @returns {Promise<{dualAuth: boolean, code: null}|null|{dualAuth: boolean, code: *}>}
     */
    static async modalAuth(params)
    {
        const { email } = params
        const user = crudUser.findUser({email: {$eq: email}})

        if (user) {
            if (user.dual_auth) {
                const typeAuthUser = crudTypeAuthUser.findOne({s_user: user._id.toString()})
                const typeAuth = crudTypeAuth.findById(typeAuthUser._id.toString())
                this._error = 'Двухфакторная защита уже подключена';
                this._codeError = '200'
                return {
                    dualAuth: true,
                    code: typeAuth.code
                }
            } else {
                this._error = 'Не подключена двухфакторная защита';
                this._codeError = '200'
                return {
                    dualAuth: false,
                    code: null
                }
            }
        }

        this._error = 'Ошибка аккаунт не найден';
        this._codeError = '404'
        return null

    }

    /**
     *
     * @param params
     * @returns {Promise<boolean>}
     */
    static async dualAuth(params)
    {
        const { email, code, status } = params
        const user = await crudUser.findUser({email: {$eq: email}})
        if (user) {
            const typeAuth = await crudTypeAuth.findOne({code: {$eq: code}})
            if (!user.dual_auth) {
                if (!typeAuth){
                    this._error = 'Ошибка данный тип аунтификации не найден';
                    this._codeError = '404'
                    return false
                }
            }

            await crudTypeAuthUser.delete({s_user: user._id.toString()})
            if (status) {
                await crudTypeAuthUser.createOne({s_user: user._id.toString(), s_type: typeAuth._id.toString()})
            }
            this._error = 'Данные успешно обновлены';
            this._codeError = '200'
            return true
        }

        this._error = 'Ошибка аккаунт не найден';
        this._codeError = '404'
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