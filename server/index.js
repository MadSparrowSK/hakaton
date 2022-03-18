const express = require('express')
const cors = require('cors')

const loginRouter = require('./Router/login-router')
const regRouter = require('./Router/reg-router')
const authRouter = require('./Router/auth-router')
const errorRouter = require('./Router/error-router')

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use(loginRouter);
app.use(regRouter);
app.use(authRouter);
app.use(errorRouter);


app.listen(PORT, () => console.log(`Server work in port ${PORT}`))