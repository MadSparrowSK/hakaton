const mongo = require('mongodb').MongoClient

try {
    mongo.connect('mongodb+srv://user:1@cluster0.pmggm.mongodb.net/HakatonDB?retryWrites=true&w=majority')
} catch (e) {
    console.log(e)
}

module.exports = mongo