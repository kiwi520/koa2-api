const Router = require('koa-router');
const tree = new Router();
const db = require('../utils/db.js');

tree.get('/', async (ctx) => {
    ctx.body = "列表页";
})


tree.get('/list', async (ctx) => {
    // let postData = ctx.request.body

    // console.log(ctx);
    // console.log(ctx.query);
    // console.log(ctx.querystring);
    // console.log(ctx.url);
    // let params = JSON.parse(ctx.querystring)
    // search:
    //         offset: 0
    // limit: 10
    console.log('params')
    console.log(ctx.query.search)
    console.log(ctx.query.offset)
    console.log(ctx.query.limit)
    console.log('params')

    // let postData = ctx.params
    // console.log('postData')
    // console.log(postData)
    // console.log(postData)
    let data = await new Promise((resolve, reject) => {
        // let sqlLang = `select id,name,name as title,pid from layTree  where pid=${postData.id}`;
        let sqlLang = `select id,name from layTree  where pid=0   LIMIT ${ctx.query.limit} OFFSET ${ctx.query.offset}`;
        // let sqlLang = `select id,name from layTree  where pid=0`;
        // let sqlLang = `select id,name,pid from layTree  where pid=${postData.id}`;
        db.query(sqlLang, (err, data) => {
            if (err) reject(err);
            resolve(data);	// 返回拿到的数据
        })
    })
    // let list = []
    // if (postData.id === '0') {
    //     list = data.map(item=>{
    //         item.children = []
    //
    //         return item
    //     })
    //     console.log('list')
    //     console.log(list)
    //     console.log(list)
    // }else {
    //     console.log('data->d')
    //     console.log(data)
    //     console.log('data->d')
    //     list = data
    // }
    ctx.body = {data:data};
})

tree.post('/list', async (ctx) => {
    let postData = ctx.request.body
    // let postData = ctx.params
    console.log('postData')
    console.log(postData)
    console.log(postData)
    let data = await new Promise((resolve, reject) => {
        // let sqlLang = `select id,name,name as title,pid from layTree  where pid=${postData.id}`;
        let sqlLang = `select id,name from layTree  where pid=${postData.id} order by ${postData.sort} ${postData.order}  LIMIT ${postData.limit} OFFSET ${postData.offset}`;
        // let sqlLang = `select id,name from layTree  where pid=0`;
        // let sqlLang = `select id,name,pid from layTree  where pid=${postData.id}`;
        db.query(sqlLang, (err, data) => {
            if (err) reject(err);
            resolve(data);	// 返回拿到的数据
        })
    })
    // let list = []
    // if (postData.id === '0') {
    //     list = data.map(item=>{
    //         item.children = []
    //
    //         return item
    //     })
    //     console.log('list')
    //     console.log(list)
    //     console.log(list)
    // }else {
    //     console.log('data->d')
    //     console.log(data)
    //     console.log('data->d')
    //     list = data
    // }
    ctx.body = {data:data};
})

module.exports = tree;
