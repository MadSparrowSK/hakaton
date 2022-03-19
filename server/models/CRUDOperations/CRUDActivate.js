const model = require('../Activate')

module.exports = class CRUDActivate
{
    /**
     *
     * @param params object
     * @returns {Promise<boolean>}
     */
    static async createOneActivation(params) {
        return await model.create(params)
    }

    /**
     *
     * @param params objects[]
     * @returns {Promise<boolean>}
     */
    static async createManyActivation(params){
        await model.insertMany(params, (err) => {
            if (err) {
                return false
            }
        })
        return true
    }

    /**
     *
     * @param id
     * @returns {Promise<Query<any, any, {}, any>>}
     */
    static async findActivationById(id)
    {
        return model.findById(id, (err) => {
            if (err) {
                return null
            }
        }).clone()
    }

    /**
     *
     * @param filter object
     * @returns {Promise<Query<any, any, {}, any>>}
     */
    static async findActivation(filter)
    {
        return model.findOne(filter, (err) => {
            if (err) {
                return null
            }
        }).clone();
    }

    /**
     *
     * @param $condition
     * @returns {Promise<void>}
     */
    static async deleteActivation($condition)
    {
        await model.deleteOne($condition)
        return true
    }

    static async deleteManyActivations($condition)
    {
        await model.deleteMany($condition).then(function(){
            return true
        }).catch((e) => {
            return false
        });
    }
}