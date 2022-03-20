const {Router} = require('express')
const randomstring = require("randomstring");
const OperationWithModels = require('../models/OperationWithModels')

const dynamicKeyRouter = new Router()

const map = new Map();

dynamicKeyRouter.post('/key',  async (req,res) => {
    const { email, code } = req.body;
    const isAuth = await OperationWithModels.checkDynamicCode({ email,code });
    if(isAuth) {
        res.status(200).json({
            message: 'ok'
        })
    } else {
        res.status(403).json({
            message: 'not ok'
        })
    }


})

dynamicKeyRouter.get('/key/:id', async (req,res) => {
    const {id} = req.params;
    const { email } = req.query;
    if(!map.has(id)) {
        map.set(id, {
            "lastDate": Date.now(),
            "key": await randomstring.generate(4),
        })
    }

    res.status(200);
    res.set({
        'Connection':'keep-alive',
        'Content-type': 'text/event-stream; charset=utf-8;',
        'Cache-Control':'no-cache'
    })

    const currentDate = Date.now();
    if(Math.abs(map.get(id)['lastDate'] - currentDate) > 10000) {
        map.get(id)['lastDate'] = currentDate;
        map.get(id)['key'] = await randomstring.generate(4);
        await OperationWithModels.reWriteCodeDynamic({ id, email,  code: map.get(id)['key']})
    }
    res.write(`data: ${map.get(id)['key']}\n\n`);
    res.end();
})

module.exports = dynamicKeyRouter;