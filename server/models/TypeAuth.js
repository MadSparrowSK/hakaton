const {Schema, model}  = require('mongoose')

const TypeAuth = new Schema({
    name: { type:String, required:true, unique: true },
    code: { type:String, required:true, unique: true},
})

module.exports = model('TypeAuth', TypeAuth)