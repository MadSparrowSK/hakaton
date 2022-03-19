const {Schema, model}  = require('mongoose')

const TempUser = new Schema({
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true},
    data_create: { type:Date, required:true, default: Date.now() },
})

module.exports = model('TempUser', TempUser)