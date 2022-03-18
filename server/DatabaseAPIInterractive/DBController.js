class DBController {
    createUser(user) {
        const { email, password } = user;
        const newUser = {
            email,
            password
        }

    }
}

module.exports = new DBController();