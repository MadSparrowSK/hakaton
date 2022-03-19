const qrcode = require('qrcode')

var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
        dark:"#010599FF",
        light:"#FFBF60FF"
    }
}

//qrcode.toDataURL('text').then(url => console.log(url))

const test = async () => {
    const opts = {
        errorCorrectionLevel: 'H',
        type: 'terminal',
        quality: 0.95,
        margin: 1,
        color: {
            dark: '#208698',
            light: '#FFF',
        },
    }
    const qrImage = await qrcode.toString('Hi testing QR code', opts)
    console.log(qrImage);
}

test()