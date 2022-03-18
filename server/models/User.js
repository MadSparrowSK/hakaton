const {Schema, model}  = require('mongoose')

const User = new Schema({
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    email_confirm: { type:Boolean, required:true, default: false },
})

module.exports = model('User', User)