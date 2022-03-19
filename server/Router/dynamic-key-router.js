const {Router} = require('express')
const randomstring = require("randomstring");

const dynamicKeyRouter = new Router()

const map = new Map();

dynamicKeyRouter.get('/key/:id', async (req,res) => {
    const {id} = req.params;
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
    if(Math.abs(map.get(id).lastDate - currentDate) > 10000) {
        map.get(id)['lastDate'] = currentDate;
        map.get(id)['key'] = await randomstring.generate(4);
    }
    console.log(`${map.has(id) ? id : 'pizdec'}:${map.get(id)['key']}`)
    res.write(`data: ${map.get(id)['key']}\n\n`);
    res.end();
})

module.exports = dynamicKeyRouter;