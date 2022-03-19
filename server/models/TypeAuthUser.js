const {Schema, model}  = require('mongoose')

const TypeAuthUser = new Schema({
    s_user: { type:String, required:true, unique: true },
    s_type: { type:String, required:true},
})

module.exports = model('TypeAuthUser', TypeAuthUser)