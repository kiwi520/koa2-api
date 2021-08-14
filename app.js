const Koa = require('koa2');
const app = new Koa();
const cors = require('koa2-cors')
const koaBody = require("koa-body");
const path = require('path')
const static = require('koa-static')
const router = require('./router/index')

const port = 9000;

// 获取静态资源文件夹
app.use(static(path.join(__dirname+'/assets')));
// app.use(static(path.join(__dirname+'/static')));
app.use(require('koa-static')(__dirname + '/static'))

// //  匹配不到页面的全部跳转去404
// app.use(async (ctx, next) => {
//     await next();
//     if (parseInt(ctx.status) === 404) {
//         ctx.response.redirect("/404")
//     }
// })

app.use(koaBody({
    multipart:true,
    formidable:{
        // 上传目录
        // uploadDir: path.join(__dirname, 'static/uploads'),
        maxFieldsSize:10*1024 *1024,
    }
}))

app.use(cors());

app.use(router.routes(), router.allowedMethods());


// // 统一异常处理
// const errorHandler = require('./utils/errorHandler.js');
//
// errorHandler(app);


app.listen(port, ()=>{
    console.log('Server is running at http://localhost:'+port);
})
