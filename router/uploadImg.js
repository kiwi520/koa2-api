const path = require('path');
const fs = require('fs');


const uploadimg = (ctx) => {
    console.log(JSON.stringify(ctx.request, null, ' '));
    let remotefilePath = null;
    if (ctx.request.files['file']) {
        // 创建可读流
        const reader = fs.createReadStream(ctx.request.files['file']['path']);
        // 防止文件命名一致，文件名后面加上时间的时分
        const randomNum =  Math.floor((Math.random() * 9 + 1)*1000);
        // const randomNum = new Date().getHours()+""+new Date().getMinutes();

        let filePath = `${path.resolve(__dirname, '../static/upload')}/${randomNum}_${ctx.request.files['file']['name']}`;
        console.log('filePath')
        console.log(filePath)
        console.log('filePath')
        remotefilePath = `http://localhost:9000/upload/${randomNum}_${ctx.request.files['file']['name']}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
    }
    return remotefilePath;
}

module.exports = uploadimg;
