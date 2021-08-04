const Router = require('koa-router');
const upload = new Router();
const uploadimg = require('./uploadImg')


upload.post('/', async function(ctx, next) {
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


module.exports = upload;
