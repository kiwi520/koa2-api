const path = require('path');
const fs = require('fs');


const uploadimg = (ctx) => {
    console.log(JSON.stringify(ctx.request, null, ' '));
    let remotefilePath = null;
    if (ctx.request.files['file']) {
        // 创建可读流
        const reader = fs.createReadStream(ctx.request.files['file']['path']);
        let filePath = `${path.resolve(__dirname, '../static/upload')}/${ctx.request.files['file']['name']}`;
        console.log('filePath')
        console.log(filePath)
        console.log('filePath')
        remotefilePath = `http://192.168.9.20:9000/upload/${ctx.request.files['file']['name']}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
    }
    return remotefilePath;
}

module.exports = uploadimg;
