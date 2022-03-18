const Sequelize = require('sequelize')

module.exports = class ConnectionDb
{
    connection

    constructor(dbName, login, password, host='localhost', dialect='mysql') {
        this.connection  = new Sequelize(
            dbName,
            login,
            password,
            {
                host: host,
                dialect: dialect
            }
        )
    }

    createConnection()
    {
        this.connection.authenticate()
                .then(() => console.log('Connected.'))
                .catch((err) => console.error('Connection error: ', err))
    }
}