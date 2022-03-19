const {Schema, model}  = require('mongoose')

const UsersCode = new Schema({
    s_user: { type:String, required:true},
    code: { type:String, required:true},
    dynamic: { type:Boolean, required:true, default: false},
})

module.exports = model('UsersCode', UsersCode)