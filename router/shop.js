const Router = require('koa-router');
const shop = new Router();
const db = require('../utils/db.js');

shop.get('/', async (ctx) => {
    ctx.body = "列表页";
})


shop.post('/add', async (ctx) => {
    let postData = ctx.request.body
    console.log(postData)
    console.log(postData.name)
    // console.log(ctx.body)
    let data = await new Promise((resolve, reject) => {
        let sqlLang = `insert into shop(name, price, productionDate, startUsefulLife, endUsefulLife) VALUES (${"'"+postData.name+"'"},${"'"+postData.price+"'"},${"'"+postData.productionDate+"'"},${"'"+postData.startUsefulLife+"'"},${"'"+postData.endUsefulLife+"'"})`;
        db.query(sqlLang, (err, data) => {
            if (err) reject(err);
            resolve(data);	// 返回拿到的数据
        })
    })
    ctx.body = data;
})

module.exports = shop;
