const Router = require('koa-router')
const login = new Router()
const bodyParser = require('koa-bodyparser')
const db = require('../utils/db')
const jwt = require('jsonwebtoken')

login.get('/', async (ctx) => {
    ctx.response.body = "登录页面"
})

login.use(bodyParser());

login.post('/register', async (ctx) => {
    let myaccount = ctx.request.body.account;
    let mypwd = ctx.request.body.pwd;
    console.log(myaccount)
    console.log(mypwd)
    let sql = `SELECT * FROM users WHERE account='${myaccount}'`;
    let result = await new Promise((resolve, reject) => {
        return db.query(sql, (err, data) => {
            if (err) throw err;
            if (data.length > 0) {
                resolve(data);
            } else {
                resolve(false);
            }
        })
    })
    if (result) {
        console.log('result[0].pwd')
        console.log(result[0].pwd)
        console.log(mypwd)
        console.log('result[0].pwd')
        // 能找到对应的账号
        if (result[0].pwd == mypwd) {
            // 账号密码正确，返回token
            ctx.body = {
                token: result[0],
                msg: '登录成功',
                account: myaccount
            };
        } else {
            // 密码错误
            ctx.body = {
                msg: '密码错误',
                account: myaccount
            };
        }
    } else {
        // 找不到对应的账号，直接插入一个
        let result1 = await new Promise((resolve, reject) => {
            // 生成token
            const token = jwt.sign({ myaccount: myaccount, mypwd: mypwd }, 'secret', { expiresIn: 3600 })
            return db.query(`INSERT INTO users (account, pwd, token) values ('${myaccount}', '${mypwd}', '${token}')`, (error, datas) => {
                if (error) throw error;
                // 已插入数据，返回用户名与token
                let obj = {
                    token,
                    msg: '登录成功',
                    account: myaccount
                }
                resolve(obj)
            })
        })
        if (result1) {
            ctx.body = result1;
        }
    }
})

module.exports = login;

