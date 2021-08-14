const Router = require('koa-router');
const employee = new Router();
const db = require('../utils/db.js');

employee.get('/', async (ctx) => {
    ctx.body = "列表页";
})


employee.get('/list', async (ctx) => {
    console.log('params')
    console.log(ctx.query.id)
    console.log(ctx.query.name)
    console.log(ctx.query.page)
    console.log(ctx.query.limit)
    console.log('params')

    let limit = ctx.query.limit
    let name = ctx.query.name
    let id = ctx.query.id
    let page = ctx.query.page
    let offset = (page-1)*limit
    // let postData = ctx.params
    // console.log('postData')
    // console.log(postData)
    // console.log(postData)

    let data = await new Promise((resolve, reject) => {
        let sql = `select e.id,(select dep.name from department as dep where dep.id  =e.dept) as depName,e.name from employee as e `;

        if (name !== ' ' || id != 0){
            sql += ` where 1=1 `
        }

        if (name !== ' '){
            sql += ` and e.name like '%${name}%' `
        }
        if (id != 0){
            sql += ` and e.id = ${id} `
        }

        sql+= `  limit ${limit} OFFSET ${offset} `
        db.query(sql, (err, data) => {
            if (err) reject(err);
            resolve(data);	// 返回拿到的数据
        })
    })

    let counter = await new Promise((resolve, reject) => {
        let sqlCount = `select count(1) as total from employee as e `;

        if (name !== ' ' || id !== 0){
            sqlCount += ` where 1=1 `
        }

        if (name !== ' '){
            sqlCount += ` and e.name like '%${name}%' `
        }
        if (id !== 0){
            sqlCount += ` and e.id = ${id} `
        }

        db.query(sqlCount, (err, counter) => {
            if (err) reject(err);
            resolve(counter);	// 返回拿到的数据
        })
    })
    // console.log('data')
    // console.log(data)
    // console.log('data')
    //
    // console.log('counter')
    // console.log(counter)
    // console.log(counter.data)
    // console.log(counter.total)
    // console.log('counter')

    ctx.body = {code:0,data:data,count:counter[0].total};
})

employee.post('/list', async (ctx) => {
    let postData = ctx.request.body
    // let postData = ctx.params
    console.log('postData')
    console.log(postData)
    console.log(postData)
    let data = await new Promise((resolve, reject) => {
        let sql = `select e.id,(select dep.name from department as dep where dep.id  =e.dept) as depName,e.name from employee as e `;
        if (postData.name.length >0){
            sql += ` where e.name like '%${postData.name}%' `
        }

        sql+= `  limit ${postData.limit} OFFSET ${postData.offset} `
        db.query(sql, (err, data) => {
            if (err) reject(err);
            resolve(data);	// 返回拿到的数据
        })
    })
    ctx.body = {data:data};
})

module.exports = employee;
