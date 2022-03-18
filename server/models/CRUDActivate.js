const model = require('Activate')

class CRUDActivate
{
    /**
     *
     * @param params object
     * @returns {Promise<HydratedDocument<any, {}, {}>[]>}
     */
    static async createOneUser(params) {
        return model.create(params, (err) => {
            if (err) {
                return false
            }
        })
    }

    /**
     *
     * @param params objects[]
     * @returns {Promise<boolean>}
     */
    static async createManyUser(params){
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
    static async findUserById(id)
    {
        return model.findById(id, (err) => {
            if (err) {
                return null
            }
        })
    }

    /**
     *
     * @param filter object
     * @returns {Promise<Query<any, any, {}, any>>}
     */
    static async findUser(filter)
    {
        return model.findOne(filter, (err) => {
            if (err) {
                return null
            }
        });
    }

    /**
     *
     * @param $condition
     * @returns {Promise<void>}
     */
    static async deleteUser($condition)
    {
        await model.deleteOne($condition).then(function(){
            return true;
        }).catch((error) => {
            return false;
        });
    }

    static async deleteManyUsers($condition)
    {
        model.deleteMany($condition).then(function(){
            return true
        }).catch((e) => {
            return false
        });
    }
}