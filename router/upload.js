const Router = require('koa-router');
const upload = new Router();
const uploadimg = require('./uploadImg')
const path = require("path");
const fs = require('fs');


upload.post('/', async function (ctx, next) {
    console.log('sssk')
    console.log('sssk')
    const imgUrl = await uploadimg(ctx);
    if (imgUrl) {
        ctx.body = {
            url: imgUrl,
            message: '文件上传成功',
            code: '0',
        }
    } else {
        ctx.body = {
            url: imgUrl,
            message: '文件上传失败',
            code: '1',
        }
    }

})

upload.get('/delete', async function (ctx, next) {

    console.log('url')
    console.log(ctx.query.url)
    console.log('url')

    let url = ctx.query.url

    let index = url.lastIndexOf('/')

    let filePath = url.slice(index + 1)

    console.log('filePath')
    console.log(filePath)
    console.log('filePath')

    deleteFilePath = `${path.resolve(__dirname, '../static/upload')}/${filePath}`;

    console.log('deleteFilePath')
    console.log(deleteFilePath)
    console.log('deleteFilePath')

    let res = fs.unlinkSync(deleteFilePath)

    console.log('res')
    console.log(res)
    console.log('res')
    // fs.delete(filePath);

    ctx.body = {
        message: '删除成功',
        code: '0',
    }

})


module.exports = upload;
