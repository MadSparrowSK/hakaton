const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const loginRouter = require('./Router/login-router')
const regRouter = require('./Router/reg-router')
const authRouter = require('./Router/auth-router')
const dynamicKeyRouter = require('./Router/dynamic-key-router')
const manyFactorAuthRouter = require('./Router/manyFactor-auntentification-router')
const errorRouter = require('./Router/error-router')

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRouter);
app.use(regRouter);
app.use(authRouter);
app.use(manyFactorAuthRouter);
app.use('/hot-key', dynamicKeyRouter);
app.use(errorRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://user:1@cluster0.pmggm.mongodb.net/HakatonDB?retryWrites=true&w=majority');
        console.log('db connected')
        app.listen(PORT, () => console.log(`Server work in port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();