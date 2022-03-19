const {Schema, model}  = require('mongoose')

const UsersCode = new Schema({
    s_user: { type:String, required:true},
    code: { type:String, required:true,},
})

module.exports = model('UsersCode', UsersCode)